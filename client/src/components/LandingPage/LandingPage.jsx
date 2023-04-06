import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./landingpage.css";
import { Container, Button } from "react-bootstrap";
import NavTittle from "../NavTittle/NavTittle";
import bannergame from "../Assets/wallpaper.jpg"
import Banner from "../Banner/Banner"
import Footer from "../Footer/Footer"

export default function LandingPage() {
    const history = useHistory()

    const handleStart=()=>{
        history.push("/home")
    }

  return (
 
      <div className="landing-container">
        <div className="button-landing">
        <Button onClick={handleStart} variant="primary" >
            Game Start
        </Button>
        </div>
      

      <NavTittle/>
      
      <div className="banner-container">
        <Banner/>
        
      
      </div>

      <div className="footer-landing">
      <Footer/>

      </div>
      
     </div>
       
  
  );
}