import { useState } from "react";
import { useDispatch } from "react-redux";
import React from "react";
import { SearchVideogame } from "../../actions";
import "./SearchBar.css"


export default function SearchBar({setCurrentPage}){

    const dispatch = useDispatch()
    const [name, setName]=useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(SearchVideogame(name))
        setName("")
        setCurrentPage(1)
    }

    return(
        <div>
            <div>
        <input className="inputSearchBar" value={name} type="text" placeholder="Buscar..." onChange={(e)=>handleInputChange(e)} />
        <button type="submit" onClick={(e)=>handleSubmit(e)}>Buscar</button>
        
        </div>
        </div>
    )


    
}