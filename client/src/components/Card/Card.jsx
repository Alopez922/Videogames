import React from "react";
import { Link } from "react-router-dom";
import "./card.css"

export default function Card ({name,background_image,genres,id}){
    return(
        <div className="card-container">
            <h2 className="Card-name">{name}</h2>
            <Link to={`/videogames/`+id}> 
            <div className="background-image"> 
            <img className="image" src={background_image} alt="Img Not Found"  width="350px" heigth="250px" />
            </div>
            </Link>
            <h2 className="Card-name">Genres</h2> 
            <h3 className="Card-name">{genres}</h3>
        </div>
    )
}