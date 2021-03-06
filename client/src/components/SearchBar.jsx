import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../actions';
import './styles/SearchBar.css'

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");


    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNamePokemons(name));
    }
    
    return(
        <div>
            <input type="text" placeholder='Buscar un Pokemon...' onChange={(e) => handleInputChange(e)} className='search_input'/>
            <button type='submit' onClick={(e) => handleSubmit(e)} className='search_button'> Buscar </button>
        </div>
    )
}