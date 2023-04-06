import axios from "axios";


export function getVideoGames(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames");
    
    return dispatch({
        type:"GET_VIDEO_GAMES",
        payload:json.data
    })
}}

export function getGenres(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/genres");
        return dispatch({
            type:"GET_GENRES",
            payload:json.data
        })
    }
}

export function getPlatforms(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/platforms");
        return dispatch({
            type:"GET_PLATFORMS",
            payload:json.data
        })
    }
}

export function clear(){
        return{
            type:"CLEAR",
            payload:[]
        }
    }





export function filterByGenres(payload){
    return{
        type:"FILTER_BY_GENRES",
        payload:payload
    }
    }

export function filterByCreated(payload){
    return{
        type:"FILTER_BY_CREATED",
        payload:payload
    }
}

export function orderByName(payload){
    return{
        type:"ORDER_BY_NAME",
        payload:payload
    }
}

export function getDetail(id){
   return async function(dispatch){
    let json = await axios.get(`http://localhost:3001/videogames/${id}`);
    return dispatch({
        type:"GET_DETAIL",
        payload:json.data
    })
   }
}

// export function getByName(name){
//     return async function(dispatch){
//         let json = await axios.get(`http://localhost:3001/name/${name}`);
//         return dispatch({
//             type:"GET_BY_NAME",
//             payload:json.data
//         })
//     }
// }
//esta la estoy probando




export function SearchVideogame(payload){
    return{
        type:"SEARCH_VIDEOGAME",
        payload:payload
    }
}

export function CreateVideogame(payload){
    return async  function(dispatch){
        const response = await axios.post("http://localhost:3001/videogames",payload);
        return response
    }
}

export function orderByRating(payload){
    return{
    type:"ORDER_BY_RATING",
    payload:payload
}
}

export function filterRating(payload){
    return{
        type:"FILTER_RATING",
        payload:payload
    }
}

export function filterByPlatform(payload){
    return{
        type:"FILTER_BY_PLATFORM",
        payload:payload
    }
}

