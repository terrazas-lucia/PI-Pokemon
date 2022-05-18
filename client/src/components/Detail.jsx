import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, clearPokemons } from '../actions/index';
import { useEffect } from 'react';
import './styles/Detail.css';

export default function Detail(props){
    const dispatch = useDispatch()
    const myPokemon = useSelector((state) => state.detail);
    

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));

        return() => dispatch(clearPokemons());
    }, [dispatch]);
    
    console.log("mypokemon detail", myPokemon)
    return(
        <div className='detail-box'>
            {myPokemon.hasOwnProperty("id") ? 
            <div>
                <h1>{myPokemon.name}</h1>
                <img src={myPokemon.img} alt="pokemon" style={{width: "96px", height: "96px"}}/>
               
                { /* 
                
                myPokemon?.createdInDb ? 
                myPokemon.types?.map((type, i) => {
                    return(
                      <h3 key={i}>{type.name}</h3>  
                    )
                }) : */
                myPokemon.types?.map((type, i) => {
                    return(
                      <h3 key={i}>{type}</h3>  
                    )
                })}
                <h4>Vida: {myPokemon.life}</h4>
                <h4>Fuerza: {myPokemon.strength}</h4>
                <h4>Defensa: {myPokemon.defense}</h4>
                <h4>Velocidad: {myPokemon.speed}</h4>
                <h4>Altura: {myPokemon.height}</h4>
                <h4>Peso: {myPokemon.weight}</h4>
            </div> : <p> loading :3 </p>} 
            <Link to="/home"> <button>Volver a la página principal</button></Link>
        </div> 
    )
}