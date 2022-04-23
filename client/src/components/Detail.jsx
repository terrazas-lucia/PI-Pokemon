import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, clearPokemons } from '../actions/index';
import { useEffect } from 'react';

export default function Detail(props){
    const dispatch = useDispatch()
    const myPokemon = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
        return() => dispatch(clearPokemons());
    }, [dispatch]);
    
    return(
        <div>
            {myPokemon.hasOwnProperty("id") ? 
            <div>
                <h1>{myPokemon.name}</h1>
                <img src={myPokemon.img} alt="pokemon" />
                {myPokemon.type.map((type) => <h2>{type}</h2>)}
                <h3>{myPokemon.life}</h3>
                <h4>{myPokemon.strength}</h4>
                <h5>{myPokemon.defense}</h5>
                <p>{myPokemon.speed}</p>
                <p>{myPokemon.height}</p>
                <p>{myPokemon.weight}</p>
            </div> : <p>loading :3</p>} 
            <Link to="/home"> <button> a casa</button></Link>
        </div> 
    )
}