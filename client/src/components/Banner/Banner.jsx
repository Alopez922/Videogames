import React from "react";
import wallpaper from "../Assets/wallpaper.jpg"
import "./Banner.css"

const Banner=()=>{
    return(
        <div className="Container-Banner">
            <img src={wallpaper} alt="" />
            <div className="text">
            <h1>Do you want play ?</h1>
            <h3>Find your favorite game now!</h3>
            </div>
        </div>
    )
}

export default Banner;