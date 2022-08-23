import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Filter.css"

export default function Filters({orderByName,filterByGenres,filterByCreated,setCurrentPage,setOrden,getVideoGames,orderByRating,filterRating,filterByPlatform}){

    const dispatch = useDispatch("")
    const allGenres = useSelector((state)=>state.genres);
    const allPlatforms = useSelector((state)=>state.platforms)


    function handleFilterGenres(e){
        e.preventDefault()
        dispatch(filterByGenres(e.target.value))
        setCurrentPage(1)
      }
    
    function handleFilterPlatforms(e){
      e.preventDefault()
      dispatch(filterByPlatform(e.target.value))
      setCurrentPage(1)
      
    }
    
      function handleFilteRating(e){
        e.preventDefault()
        dispatch(filterRating(e.target.value))
        setCurrentPage(1)
      }

      function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    };
   
    function handleSortRating(e){
        e.preventDefault()
        dispatch(orderByRating(e.target.value));
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)


    }
    
      function handleFilterByCreated(e){
        e.preventDefault();
        dispatch(filterByCreated(e.target.value))
        setCurrentPage(1)
        
      }

      function handleClick(e) {
        e.preventDefault();
        dispatch(getVideoGames());
        setCurrentPage(1)
      }



      return (
        <div className="Filter-Container">
             
             <div className="ordenamiento"> 
             <select className="selectOrdenamiento" onChange={e=>{handleSort(e)}}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
            </select>
            </div>
    
            <div> 
        <select onChange={e => handleFilterPlatforms(e)}>
          {
          allPlatforms.map ((el)=>(
            <option value={el} key={el}>{el}</option>
          ))
          }
        </select>
        </div>
          {/* este es el filtro que estoy probando */}
        <div> 
        <select onChange={e => handleFilterGenres(e)}>
          {
          allGenres.map ((el)=>(
            <option value={el.name} key={el.name}>{el.name}</option>
          ))
          }
        </select>
        </div>

        <div>
          <select onChange={e=> handleFilteRating(e)}>
          <option value="All">All Rating</option>
          <option value="3.90">Rating Menor a 3.90</option>
          <option value="4.00">Rating Mayor a 4.00</option>
          </select>
        </div>

          <div>
            <select onChange={e=>{handleSortRating(e)}}>
              <option value="Mayor">Ordenar de Mayor a Menor Rating</option>
              <option value="Menor">Ordenar de Menor a MayorRating</option>
            </select>
          </div>


          <div> 
        <select onChange={e=>handleFilterByCreated(e)}>
          <option value="All">All</option>
          <option value="Created">Created</option>
          <option value="Api">Api</option>
        </select>
          </div>
          <div> 
        <button onClick={(e) => { handleClick(e);}}>
        volver a cargar videojuegos
        </button>

          


        <Link to="/create"> 
            <button>
            Crear videojuego
            </button>
            </Link>
        </div>
        </div>

        
      )

      
}