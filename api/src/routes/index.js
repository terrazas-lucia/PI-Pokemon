const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Pokemon, Type } = require('../db.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=40`);
    const details = await Promise.all(apiUrl.data.results.map(async el => await axios(el.url)));
    const apiInfo = details.map(el => {
         return {
            id: el.data.id,
            name: el.data.name,
            type: el.data.types.length < 2 ? [el.data.types[0].type.name] : [el.data.types[0].type.name, el.data.types[1].type.name],
            life: el.data.stats[0].base_stat,
            strength: el.data.stats[1].base_stat,
            defense: el.data.stats[2].base_stat,
            speed: el.data.stats[3].base_stat,
            height: el.data.height,
            weight: el.data.weight,
            img: el.data.sprites.front_default
        }; 
    });
    return apiInfo;
}

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include:{ //inclui el modelo pokemontype
            model: Type,
            attributes: ['name'], //trae este atributo
            through: {
                attributes: [],
            },
        }
    })
}

const getAllPokemons = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}


router.get('/pokemons', async (req, res) => {
    const {name} = req.query;
    let pokemonsTotal = await getAllPokemons();
    if(name){ //si hay un query
        let pokemonName = await pokemonsTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase())); //por si hay una busca en mayuscula, 
        pokemonName.length ? res.status(200).send(pokemonName) : res.status(404).send("no se encontro el pokemon");
    } else {
        res.status(200).send(pokemonsTotal);
    }
})

router.get('/types', async (req, res) => {
    const types = await Type.findAll();
    if(types.length === 0){
        const typesApi = await axios.get(`https://pokeapi.co/api/v2/type`);
        const typesTotal = typesApi.data.results; 
        const p = typesTotal.map( async (el) => {
            const type = await Type.create({
                name: el.name
            })
            return type;
        })  
        await Promise.all(p);
        const resp = await Type.findAll();
        res.json(resp);
    } else {
        res.json(types);
    }
});

router.get('/pokemons/:id', async (req, res) => {
    const id = parseInt(req.params.id); 
    const pokemonsTotal = await getAllPokemons();
    if(id){
        const pokemonId = pokemonsTotal.filter(el => el.id === id)
        pokemonId.length ? res.status(200).json(pokemonId) : res.status(404).send("no se encontro el pokemon");
    }
})

router.post('/pokemons', async (req, res) => {
    const { id, createdInDb, name, life, strength, defense, speed, height, weight, img, type } = req.body //lo busca en el body
    const pokemonCreated = await Pokemon.create({ //lo crea en el modelo
        id, createdInDb, name, life, strength, defense, speed, height, weight, img, type
    })

    const typeInDb = await Type.findAll({ //busca en el type si hay algun name q coincida con el type del body para asignarselo
        where: { name : type }
    })

    pokemonCreated.addType(typeInDb) //le agrega el type al pokemon creado
    res.send('personaje creado con exito') 
})

module.exports = router;
