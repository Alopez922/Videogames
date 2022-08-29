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
        
<body>
    

        
       {loading && <Loading/>}
            <div className="card-detail"> 
            <div className="foce frente">
            <h3>{videogame.name}</h3>
            <div className="image">
            <img src={videogame.background_image} alt="Not Found" />
            </div>
            <h2>Genres: {videogame.genres}</h2>
            <h2>Released:    {videogame.released}</h2>
            <h2>Rating:  {videogame.rating}</h2>
            <h2>Platforms: <p>{videogame.platforms} </p></h2>
                <Link to= "/home">
                    <button>Back</button>
                </Link>

            </div>
            </div>

            <div className="description">
                <h1>Description</h1>
                <h3><p>{videogame.description}</p></h3>
            </div>
         
            
</body>
                   
            
      
  
  
            
       
     
    )
}

{/* <div className="detail-Container">
           
            
<div className="card-detail">


{loading && <Loading/>}


    <h1>{videogame.name}</h1>
    <img className="image" src={videogame.background_image} alt="Not Found" width="300px" heigth="250px" />
    <h2>Genres:</h2>
    <h3>{videogame.genres}</h3>
    <h2>Description:</h2>
    <h5 className="Card-description">{videogame.description}</h5>
    <h2>Released:</h2>
    <h3>{videogame.released}</h3>
    <h2>Platforms:</h2>
    <h3>{videogame.platforms}</h3>
    <h2>Rating:</h2>
    <h3>{videogame.rating}</h3>
        <div>
        <Link to="/home">  
        <button>Go Back</button>
        </Link>
        </div>

    </div>
    </div> */}