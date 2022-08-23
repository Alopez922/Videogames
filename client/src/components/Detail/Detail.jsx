import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getDetail } from "../../actions";
import { useEffect } from "react";
import  Loading from "../Loading/loading"
import "./detail.css"


export default function Detail(detalle){
    const dispatch = useDispatch()
    const loading = useSelector(state=>state.loading) //esto de julio

    
    useEffect(()=>{
     dispatch(getDetail(detalle.match.params.id))
    },[dispatch,detalle])

    const videogame = useSelector((state)=>state.detail)
    return(
        
        
        <div className="detail-Container">
           
            
        <div className="card-detail">
       

       {loading && <Loading/>}


            <h1 className="Card-name">{videogame.name}</h1>
            <img className="image" src={videogame.background_image} alt="Not Found" width="300px" heigth="250px" />
            <h2 className="Card-name">Genres:</h2>
            <h3 className="Card-name">{videogame.genres}</h3>
            <h2 className="Card-name">Description:</h2>
            <h5 className="Card-description">{videogame.description}</h5>
            <h2 className="Card-name">Released:</h2>
            <h3 className="Card-name">{videogame.released}</h3>
            <h2 className="Card-name">Platforms:</h2>
            <h3 className="Card-name">{videogame.platforms}</h3>
            <h2 className="Card-name">Rating:</h2>
            <h3 className="Card-name">{videogame.rating}</h3>
                <div>
                <Link to="/home">  
                <button>Go Back</button>
                </Link>
                </div>

            </div>
            </div>
    
            
       
     
    )
}

