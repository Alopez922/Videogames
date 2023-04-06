import React from "react";
import "./card.css"
import { IoLogoGameControllerB } from 'react-icons/io';
import { Link } from "react-router-dom";

export default function GameCard ({name,background_image,genres,id,rating}){
  return (
      <div className="Card-container">
            <Link to={`/videogames/${id}`}>

        <div className="img-container">
          <img src={background_image} width={300} height={250} alt="" />
          <div className="rating-span"><span>★</span>{rating}</div>
        </div>
        </Link>

        <div className="name-card"> {name} </div>
        <div className="genres-card"> 
          <IoLogoGameControllerB style={{fontSize: '25px', verticalAlign: 'middle', marginRight:"5px"}}/>{genres}
        </div>
      </div>
  )
}
