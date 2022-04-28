import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterCreated, orderByName, orderByStrength } from '../actions';
import { Link } from 'react-router-dom'
import Card from './Card';
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import './styles/Home.css';


export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonsPerPage = 12;
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; 
    const currentPokemon = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const [filterPokemon, setFilterPokemon] = useState(currentPokemon);
    const error = useSelector((state) => state.error);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getPokemons()); //lo mismo que hacer mapdispatchtoprops 
    }, [dispatch])

    function handleFilterByCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
    }

    function handleFilterAscDesc(e){
            dispatch(orderByName(e.target.value));
            setCurrentPage(1); 
    }

    function handleFilterStrength(e){
        dispatch(orderByStrength(e.target.value));
        setCurrentPage(1);
    }
    
    const handleOnClick = ()=> {
        dispatch(getPokemons());
    }

    return(
        <div className="home-box">
            <nav>
                <div onClick={handleOnClick}><h1> pokeid. </h1></div>
                <SearchBar/>
                <Link to = '/pokemons'><button class="button-create">¡Crea tu propio pokemon!</button></Link>
                </nav>
                <div className="filter">
                    <h4>Filtrar por: </h4>
                    <div>
                        <select onChange={e => handleFilterByCreated(e)}>
                            <option value='all'>Todos los pokemons</option>
                            <option value='created'>Creados por mi</option>
                            <option value='api'>Pokemons ya existentes</option>
                        </select>
                    </div>
                    <div>
                        <h4>Orden alfabetico:</h4>
                        <select onChange={e => handleFilterAscDesc(e)}>
                            <option value='asc'> A - Z </option> 
                            <option value='desc'> Z - A </option> 
                            
                        </select>
                        <h4>Fuerza:</h4>
                        <select onChange={e => handleFilterStrength(e)}>
                            <option value='strongest'> Del más fuerte al más debil </option>
                            <option value='weakest'> Del más debil al más fuerte </option>
                        </select>
                    </div>
                </div>
            {  error?.length ? <p> {error} </p> : 
            currentPokemon?.map((el, i) => { //se trae el estado global y pregunta si existe y lo mapea y se lo pasa a la card
                return(
                    <Card key={i} id={el.id} name={el.name} img={el.img} type={el.type}/>
                )
            })}
            <Pagination pokemonsPerPage={ pokemonsPerPage } allPokemons={ allPokemons.length } pagination={ pagination }/>
        </div>
    )
}