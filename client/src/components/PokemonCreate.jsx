import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postPokemon, getTypes } from '../actions';
import { useDispatch, useSelector } from 'react-redux';

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Se requiere un nombre.';
    } 
    else if(typeof input.name !== "undefined"){
        if(!input.name.match(/^[a-zA-Z]+$/)){
            errors.name = 'No se permiten caracteres especiales, solo letras.';
        }
    }

    if (!input.life){
        errors.life = 'Se requiere vida.';
    }
    else if (typeof input.life !== "undefined"){
        if(!input.life.match(/^[0-9]+$/)){
            errors.life = 'Solo numeros.';
        } else if(input.life.length > 2){
            errors.life = 'Solo se permiten numeros de dos cifras.';
        }
    }

    if (!input.attack){
        errors.attack = 'Se requiere ataque.';
    }
    else if (typeof input.attack !== "undefined"){
        if(!input.attack.match(/^[0-9]+$/)){
            errors.attack = 'Solo numeros.';
        } else if(input.attack.length > 2){
            errors.attack = 'Solo se permiten numeros de dos cifras.';
        }
    }

    if(!input.defense){
        errors.defense = 'Se requiere defensa.';
    } 
    else if (typeof input.defense !== "undefined"){
        if(!input.defense.match(/^[0-9]+$/)){
            errors.defense = 'Solo numeros.';
        } else if(input.defense.length > 2){
            errors.defense = 'Solo se permiten numeros de dos cifras.';
        }
    }

    if(!input.strength){
        errors.strength = 'Se requiere fuerza.';
    }
    else if (typeof input.strength !== "undefined"){
        if(!input.strength.match(/^[0-9]+$/)){
            errors.strength = 'Solo numeros.';
        } else if(input.strength.length > 2){
            errors.strength = 'Solo se permiten numeros de dos cifras.';
        }
    }

    if(!input.speed){
        errors.speed = 'Se requiere velocidad.';
    } 
    else if (typeof input.speed !== "undefined"){
        if(!input.speed.match(/^[0-9]+$/)){
            errors.speed = 'Solo numeros.';
        } else if(input.speed.length > 2){
            errors.speed = 'Solo se permiten un numero de dos cifras.';
        }
    }
    
    if(!input.height){
        errors.height = 'Se requiere altura.';
    }
    else if (typeof input.height !== "undefined"){
        if(!input.height.match(/^[0-9]+$/)){
            errors.height = 'Solo numeros.';
        } else if(input.height.length > 3){
            errors.height = 'Solo se permite un numero de 3 cifras.'
        }
    }

    if(!input.weight){
        errors.weight = 'Se requiere peso.';
    }
    else if (typeof input.weight !== "undefined"){
        if(!input.weight.match(/^[0-9]+$/)){
            errors.weight = 'Solo numeros.';
        } else if(input.weight.length > 3){
            errors.weight = 'Solo se permite un numero de 3 cifras.'
        }
    }

    if(!input.img){
        errors.img = 'Se requiere una imagen.';
    }
    if(input.img !== "undefined"){
        if(input.img.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]\.[a-z]\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)){
            errors.img = 'URL invalido.'
        }
    }

    if(!input.type){
        errors.type = 'Por favor, elija uno o dos tipos.'
    }

    if(input.type !== "undefined"){
        if(input.type.length > 2){
            errors.type = 'Solo se puede elegir dos tipos.'
        }
    }

    return errors;
}

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        life: "",
        attack: "",
        defense: "",
        strength: "",
        speed:"",
        height:"",
        weight:"",
        img:"",
        type: [],
    })

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    }

    function handleSelect(e){
        e.preventDefault();
        setInput({
            ...input,
            type:[...input.type, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postPokemon(input));
        alert("kokemon creado rey");
        setInput({
            name: "",
            life: "",
            attack: "",
            defense: "",
            strength: "",
            speed:"",
            height:"",
            weight:"",
            img:"",
            type: [],
        })
    }
    function handleDelete(el){
        setInput({
            ...input,
            type: input.type.filter(t => t !== el)
        })
    }

    useEffect(() => {
        dispatch(getTypes());
    }, [dispatch]);

    return(
        <div>
            <Link to='/home'><button>volver</button></Link>
            <h1>crea tu kokemon</h1>
            <form onSubmit={e => {handleSubmit(e)}}>
                <div>
                    <label>nombre:</label>
                    <input type="text" value={input.name} name="name" required onChange={e => {handleChange(e)}}/>
                    {errors.name && ( <p>{errors.name}</p>)}
                </div>
                <div>
                    <label>vida</label>
                    <input type="text" value={input.life} name="life" required onChange={e => {handleChange(e)}}/>
                    {errors.life && ( <p>{errors.life}</p>)}
                </div>
                <div>
                    <label>ataque</label>
                    <input type="text" value={input.attack} name="attack" required onChange={e => {handleChange(e)}}/>
                    {errors.attack && ( <p>{errors.attack}</p>)}
                </div>
                <div>
                    <label>defensa</label>
                    <input type="text" value={input.defense} name="defense" required onChange={e => {handleChange(e)}}/>
                    {errors.defense && ( <p>{errors.defense}</p>)}
                </div>
                <div>
                    <label>fuerza</label>
                    <input type="text" value={input.strength} name="strength" required onChange={e => {handleChange(e)}}/>
                    {errors.strength && ( <p>{errors.strength}</p>)}
                </div>
                <div>
                    <label>velocidad</label>
                    <input type="text" value={input.speed} name="speed" required onChange={e => {handleChange(e)}}/>
                    {errors.speed && ( <p>{errors.speed}</p>)}
                </div>
                <div>
                    <label>altura</label>
                    <input type="text" value={input.height} name="height" required onChange={e => {handleChange(e)}}/>
                    {errors.height && ( <p>{errors.height}</p>)}
                </div>
                <div>
                    <label>peso</label>
                    <input type="text" value={input.weight} name="weight" required onChange={e => {handleChange(e)}}/>
                    {errors.weight && ( <p>{errors.weight}</p>)}
                </div>
                <div>
                    <label>imagen</label>
                    <input type="url" value={input.img} name="img" required onChange={e => {handleChange(e)}}/>
                    {errors.img && ( <p>{errors.img}</p>)}
                </div>
                <select onChange={e => {handleSelect(e)}}>
                    {types.map((t) => {
                        return(
                        <option value= {t.name}>{t.name}</option>
                        )
                    })}
                </select>
                <button type='submit'>crear</button>
            </form>
                {input.type.map(el =>
                    <div> 
                        <p>{el}</p>
                        <button onClick={() => handleDelete(el)}>x</button>
                    </div> 
                    )}
        </div>
    )
}