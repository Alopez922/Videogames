import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./landingpage.css";
import { Container, Button } from "react-bootstrap";
import NavTittle from "../NavTittle/NavTittle";
import bannergame from "../Assets/wallpaper.jpg"
import Banner from "../Banner/Banner"
import Footer from "../Footer/Footer"
import wallpaper from "../Assets/wallpaper.jpg"

export default function LandingPage() {
    const history = useHistory()

    const handleStart=()=>{
        history.push("/home")
    }
   

  return (

      <div className="landing-container">
                <div className="image-container">
                <img src={wallpaper} alt="" width="100%" height="630px" />
                <div className="text">
            <h1>Do you want play ?</h1>
            <h3>Find your favorite game now!</h3>
            </div>
                </div>

        <div className="button-landing">
        <Button onClick={handleStart} variant="primary" >
            Game Start
        </Button>
        </div>
      

      <NavTittle/>
{/*       
      <Banner/> */}

        
        <div className="footer-landing">
        <Footer/>

        </div>

</div>
      
  
  );
}