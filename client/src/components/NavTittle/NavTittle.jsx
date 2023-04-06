import React, { useState } from "react";
import "./NavTittle.css";
import { Container } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import MyVerticallyCenteredModal from "../Modal/MyVerticallyCenteredModal";

export default function NavTittle() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  }

  return (
    <>
      <Navbar expand="lg" className="w-100 nav-container">
        <Container className="navtitle-container">
          <Navbar.Brand>
            <b><span className="span-title">★</span> <span className="span-title"> PI-Videogames</span> </b>
          </Navbar.Brand>
          <Nav>
            {/* <Link to={`/videogamesCreate`}> */}
              <Button className="animated-button" onClick={handleShowModal}>
                Create Game
              </Button>
            {/* </Link> */}
          </Nav>
        </Container>
      </Navbar>

      <MyVerticallyCenteredModal
        show={showModal}
        onHide={() => setShowModal(false)}
      />
    </>
  );
}
