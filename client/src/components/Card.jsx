import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Card.css';

export default function Card({ id, name, img, types }){
    console.log("Card", types);
    return(
        <div className='card-box'>
            <Link to={`/pokemons/${id}`}><h3>{ name }</h3></Link>
            {types?.map((t, i) => {
                return(
                    <h5 key={i}> {t}</h5>
                )
            })}
            <img src={ img } alt="imagen del kokemon"/>
        </div>
    )
}