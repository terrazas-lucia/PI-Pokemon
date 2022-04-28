import React from 'react';
import { useSelector } from 'react-redux';
import './styles/Pagination.css';

export default function Pagination({ pokemonsPerPage, allPokemons, pagination }){
    const pageNumbers = []; 
    const error = useSelector((state) => state.error);

    for( let i=1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i); 
    }

    return(
        <> {error?.length ? null : 
        <nav className='pagination'>
            <ul>
                { pageNumbers && pageNumbers.map((number, i) => {
                    return(
                    <button key={i} onClick={() => pagination(number)}>{number}</button>
                )})}
            </ul>
        </nav>}
        </>
    )
}