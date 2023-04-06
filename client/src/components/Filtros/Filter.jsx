import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Filter.css"
import { Form, Button } from 'react-bootstrap';

export default function Filters({orderByName,filterByGenres,filterByCreated,setCurrentPage,setOrden,getVideoGames,orderByRating,filterRating,filterByPlatform}){

    const dispatch = useDispatch("")
    const allGenres = useSelector((state)=>state.genres);
    const allPlatforms = useSelector((state)=>state.platforms)


    function handleFilterGenres(e){
        e.preventDefault()
        dispatch(filterByGenres(e.target.value))
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
        <div className="Filter-Container d-flex flex-wrap justify-content-center align-items-center">
          <div className="ordenamiento"> 
          <label> Sort asc -desc </label>
            <Form.Select className="selectOrdenamiento" onChange={e => {handleSort(e)}}>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </Form.Select>
          </div>
      
          <div className="filtro-genero">
            <label> Genre </label>
            <Form.Select className="filter-genre" onChange={e => handleFilterGenres(e)}>
              {allGenres.map((el) => (
                <option value={el.name} key={el.name}>{el.name}</option>
              ))}
            </Form.Select>
          </div>
      
          <div className="ordenamiento-rating"> 
                  <label> Rating</label>
            <Form.Select className="Rating"  onChange={e => {handleSortRating(e)}}>
              <option value="Menor">Rating Menor</option>
              <option value="Mayor">Rating Mayor</option>
            </Form.Select>
          </div>
      
          <div className="filtro-creacion"> 
          <label> Games Created/Api </label>
            <Form.Select className="Filter-created" onChange={e => handleFilterByCreated(e)}>
              <option value="All">All</option>
              <option value="Created">Created</option>
              <option value="Api">Api</option>
            </Form.Select>
          </div>
      
          <div className="volver-a-cargar w-100"> 
            <Button onClick={e => handleClick(e)} className="btn-custom">
              VideoGames
            </Button>
          </div>
        </div>
      );
}








