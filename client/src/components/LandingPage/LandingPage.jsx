import React from "react"
import {Link} from "react-router-dom"
import "./landingpage.css"

export default function LandingPage(){
    return (
        <div className="background">
            
            <Link to = "/home">
                <button className="button"><strong>GAME START</strong></button>
            </Link>
        </div>
    )
}