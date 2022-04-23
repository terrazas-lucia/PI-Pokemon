import React from 'react';

export default function Pagination({ pokemonsPerPage, allPokemons, pagination }){
    const pageNumbers = []; 

    for( let i=1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i); 
    }

    return(
        <nav>
            <ul>
                { pageNumbers && pageNumbers.map(number => {
                    return(
                    <button onClick={() => pagination(number)}>{number}</button>
                )})}
            </ul>
        </nav>
    )
}