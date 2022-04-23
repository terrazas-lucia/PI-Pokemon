import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterCreated, orderByName, orderByStrength } from '../actions';
import { Link } from 'react-router-dom'
import Card from './Card';
import Pagination from './Pagination';
import SearchBar from './SearchBar';


export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, /* setPokemonsPerPage */] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage; 
    const currentPokemon = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getPokemons()); //lo mismo que hacer mapdispatchtoprops 
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

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

    return(
        <div>
            <Link to = '/pokemons'> crear pokemon </Link>
            <h1> aguante boca </h1>
            <button onClick={e => {handleClick(e)}}>
                viva peron y chicago
            </button>
            <div>
                <select onChange={e => handleFilterByCreated(e)}>
                    <option value='all'>todos</option>
                    <option value='created'>creados</option>
                    <option value='api'>existentes</option>
                </select>
            </div>
            <div>
                <h4>ordenamiento</h4>
                <select onChange={e => handleFilterAscDesc(e)}>
                    <option value='asc'> arriba </option> 
                    <option value='desc'> abajo </option> 
                    
                </select>
                <select onChange={e => handleFilterStrength(e)}>
                    <option value='strongest'> fuerte </option>
                    <option value='weakest'> debil </option>
                </select>
            </div>
            <SearchBar/>
            <Pagination pokemonsPerPage={ pokemonsPerPage } allPokemons={ allPokemons.length } pagination={ pagination }/>
            { currentPokemon?.map( el => { //se trae el estado global y pregunta si existe y lo mapea y se lo pasa a la card
                return(
                    <Card id={el.id} name={el.name} img={el.img} type={el.type}/>
                )
            })}
        </div>
    )
}