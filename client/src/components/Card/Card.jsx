import React from "react";
import { Link } from "react-router-dom";
import "./card.css"

export default function Card ({name,background_image,genres,id}){
    return(
        // <div className="card-container">
        //     <h2 className="Card-name">{name}</h2>
        //     <Link to={`/videogames/`+id}> 
        //     <div className="background-image"> 
        //     <img className="image" src={background_image} alt="Img Not Found"  width="350px" heigth="250px" />
        //     </div>
        //     </Link>
        //     <h2 className="Card-name">Genres</h2> 
        //     <h3 className="Card-name">{genres}</h3>
        // </div>

        //desde aqui voy a probar lo nuevo
        <div className="card">
            <div className="face front">
                <img  src={background_image} alt="" />
                <h3>{name}</h3>
            </div>

        <div className="face back">
            <div className="image-card"> 
            <img  src={background_image} alt="" />
            </div>
            <h4>{name}</h4>
            <h5>Genres:  {genres}</h5>
            
            <Link to={`/videogames/`+id}>
                <button>Detalle</button>
            </Link>
        </div>
        
        </div>
    )
}