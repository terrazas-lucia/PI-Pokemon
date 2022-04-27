import axios from 'axios';

export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/pokemons",{});
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

export function filterCreated(payload){
    return({
        type: "FILTER_BY_CREATED",
        payload
    })
}

export function orderByName(payload){
    return ({
        type: 'ORDER_BY_NAME',
        payload
    })
}

export function orderByStrength(payload){
    return({
        type: 'ORDER_BY_STRENGTH',
        payload
    })
}

export function getNamePokemons(payload){
    return async function(dispatch){
      try {
          var json = await axios.get("http://localhost:3001/pokemons?name=" + payload);
          return dispatch({
              type: 'GET_NAME',
              payload: json.data
        })   
    } catch (error){
        console.log(error);
        }
    }
}

export function getTypes(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/types",{});
    return dispatch({ 
        type: 'GET_TYPE',
        payload: json.data
    });
    }
}

export function getDetail(id){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/pokemons/" + id);
        return dispatch({
            type: "GET_DETAIL",
            payload: json.data[0]
        })
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        var json = await axios.post("http://localhost:3001/pokemons", payload);
        return json;
    }
}

export function clearPokemons(){
        return {
            type: 'CLEAR_DETAILS',
            payload: {}
        }
}