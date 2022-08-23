import React from "react";
import SearchBar from "../SearchBar/Searchbar";
import Filter from "../Filtros/Filter"
import { filterRating, getVideoGames } from "../../actions";
import "./Nav.css"
export default function NavBar({orderByName,filterByGenres,filterByCreated,setCurrentPage,setOrden,orderByRating,filterByPlatform}){
    return(
        <div> 
        <div className="SearchBar"> 
            <SearchBar setCurrentPage={setCurrentPage}/>
        </div>
        <div className="filters">
            <Filter setCurrentPage={setCurrentPage} orderByName={orderByName} orderByRating={orderByRating} filterByCreated ={filterByCreated}filterByGenres ={filterByGenres} setOrden={setOrden} getVideoGames={getVideoGames} filterRating={filterRating} filterByPlatform={filterByPlatform}/>
        </div>
       </div>
    )
}