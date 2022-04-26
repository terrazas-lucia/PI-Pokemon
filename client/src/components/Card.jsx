import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Card.css';

export default function Card({ id, name, img, type }){
    return(
        <div class='card-box'>
            <Link to={`/pokemons/${id}`}><h3>{ name }</h3></Link>
            <h5> { type } </h5>
            <img src={ img } alt="imagen del kokemon"/>
        </div>
    )
}