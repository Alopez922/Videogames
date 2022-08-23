
const initialState = {
  videogames: [],
  allvideogames: [],
  genres: [],
  detail:[],
  platforms:[],
  loading:true,
  
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_VIDEO_GAMES":
      return {
        ...state,
        videogames: action.payload,
        allvideogames: action.payload,
        loading:false
        
      };
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "GET_PLATFORMS":
      return{
        ...state,
        platforms:action.payload
      };

    case "FILTER_BY_GENRES":
      return {
        ...state,
        videogames: state.allvideogames.filter(function (el) {
          if (action.payload === "All") {
            return state.allvideogames;
          } else if (el.genres) {
            return el.genres.includes(action.payload);
          } else if (!el.genres) return state.allvideogames;
        }),
      }
    case "ORDER_BY_NAME":
      let orderName = action.payload === "asc"?
      state.videogames.sort(function(a, b){
          if(a.name >b.name){
              return 1;
          }
          if(b.name >a.name){
              return -1;
          }
          return 0;
      }):
      state.videogames.sort((a, b) => {
          if (a.name > b.name) {
              return -1
          }
          if (b.name > a.name) {
              return 1
          }
      })
      return{
         ...state,
         videogames: orderName
      }

    case "ORDER_BY_RATING":
        let MayorRating = action.payload === "Menor"?
        state.videogames.sort(function(a, b){
            if(a.rating > b.rating){
                return 1;
            }
            if(b.rating >a.rating){
                return -1;
            }
            return 0;
        }):
        state.videogames.sort((a, b) => {
            if (a.rating > b.rating) {
                return -1
            }
            if (b.rating > a.rating) {
                return 1
            }
        })
        return{
           ...state,
           videogames: MayorRating
        }

    case "GET_DETAIL":
      return{
        ...state,
        detail:action.payload,
        loading:false
      }
    
    case "SEARCH_VIDEOGAME":
      return{
        ...state,
        videogames:state.allvideogames.filter((game)=>game.name.toLowerCase().trim().includes(action.payload.toLowerCase().trim()))
      }

    case "FILTER_BY_CREATED":
      return{
        ...state,
        videogames:state.allvideogames.filter((game)=>{
          if(action.payload ==="All"){
            return state.allvideogames
          }else if (action.payload ==="Created" && typeof game.id ==="string"){
            return game.id
          }else if(action.payload ==="Api" && typeof game.id ==="number"){
            return game.id
          }
          })
        }

    case "FILTER_RATING":
      return{
        ...state,
        videogames:state.allvideogames.filter(function(el){
          if(action.payload ==="All"){
            return state.allvideogames;
          }else if (action.payload === "3.90" && el.rating <= 3.90){
            return el.rating
          }else if (action.payload === "4.00" && el.rating >= 4.0){
            return el.rating
          }
        })
      }
         
    case "FILTER_BY_PLATFORM":
      return{
        ...state,
        videogames:state.allvideogames.filter(function(el){
          if(action.payload ==="All"){
            return state.allvideogames
          }else if(el.platforms){
            return el.platforms.map(e=>e).includes(action.payload)
          }else if(!el.platforms){
            return state.allvideogames
          }
        })
      }
      

    case "CREATE_VIDEOGAMES":
      return{
        ...state,
      }
    

    default:
      return state;
  }
}

export default rootReducer;
