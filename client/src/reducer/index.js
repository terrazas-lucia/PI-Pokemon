const initialState = {
    pokemons : [],
    allPokemons: [],
    detail: {},
    types: [],
    error: ""
}

function rootReducer(state= initialState, action){
    switch(action.type){
        case 'GET_POKEMONS':
            return{
                ...state,
                pokemons:action.payload, 
                allPokemons:action.payload,
                error: ""
            }
        case 'FILTER_BY_CREATED':
            const allPokemons = state.allPokemons;
            const createdFilter = action.payload === 'created' ? allPokemons.filter( el => el.createdInDb) : allPokemons.filter( el => !el.createdInDb)
            return{
                ...state,
                pokemons:action.payload === 'all' ? state.allPokemons : createdFilter
            }
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === 'asc' ? state.pokemons.sort(function(a, b){
                if(a.name > b.name){
                    return 1;
                } if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) : state.pokemons.sort(function(a, b){
                if(a.name > b.name){
                    return -1;
                } if(b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                pokemons: [...sortedArr]
            }
        case 'ORDER_BY_STRENGTH':
            let sortedArrStrength = action.payload === 'weakest' ? state.pokemons.sort(function(a, b){
                if(a.strength > b.strength){
                    return 1;
                } if(b.strength > a.strength){
                    return -1;
                }
                return 0;
            }) : state.pokemons.sort(function(a, b){
                if(a.strength > b.strength){
                    return -1;
                } if(b.strength > a.strength){
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                pokemons:[...sortedArrStrength]
            }
        case 'GET_NAME':
            return{
                ...state,
                pokemons:action.payload,
                error: ""
            }
        case 'GET_TYPE':
            return{
                ...state,
                types:action.payload,
                error: ""
            }
        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload,
                error: ""
            }
        case 'CLEAR_DETAILS':
            return{
                ...state,
                detail: action.payload
            }
        case "POST_POKEMON":
            return{
                ...state,
            }
        case "GET_ERROR":
            return{
                ...state,
                error: action.payload
            }
        default:
            return state;
        }
}

export default rootReducer;