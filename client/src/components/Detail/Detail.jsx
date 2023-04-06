import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clear, getDetail } from "../../actions";
import Loading from "../Loading/loading";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./detail.css";
import NavTittle from "../NavTittle/NavTittle";
import Footer from "../Footer/Footer";

export default function Detail({ match }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    dispatch(getDetail(match.params.id)).then(() => {
      setIsLoading(false);
    });
    return () => {
      dispatch(clear());
    };
  }, [dispatch, match]);

  const videogame = useSelector((state) => state.detail);

  const containerStyle = {
    backgroundImage: `url(${videogame.background_image})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "start",
    minHeight: "100vh",
    width:"100%"
  };

  if (isLoading) {
    return (
      <Container fluid style={containerStyle}>
        <NavTittle />
        <Loading />
        <Footer />
      </Container>
    );
  }

  return (
    <Container fluid style={containerStyle}>
      <NavTittle />
      <div className="div-detail">
        <Row
          md={8}
          style={{
            width: "100%",
            justifyContent: "space-around",
            alignItems: "start",
          }}
        >
          <Col
            md={7}
            style={{
              padding: "25px",
              borderRadius: "15px",
              backgroundColor: "rgba(128, 0, 128, 0.5)",

              color: "white",
            }}
          >
            <Row style={{ justifyContent: "center" }}>
              <h3>{videogame.name}</h3>
            </Row>
            <Row style={{textAlign:"justify"}} >
              <p>{videogame.description}</p>
            </Row>
          </Col>

          <Col
            md={4}
            className="order-first-responsive"
            style={{
              padding: "10px",
              borderRadius: "15px",
              justifyContent: "center",
              backgroundColor: "rgba(128, 0, 128, 0.5)",
            }}
          >
            <div className="img-detail">
              <img src={videogame.background_image} alt="" />
            </div>
          </Col>

          <Col
            md={5}
            style={{
              display:"flex",
              flexDirection:"column",
              justifyContent:"flex-start",
              alignContent:"flex-start",
              width: "100%",
              borderRadius: "15px",
              backgroundColor: "rgba(128, 0, 128, 0.5)",
              color:"white",
              margin:"30px"
            
            }}
          >
            <Row md={4}
            style={{
              padding:"5px",
              paddingLeft:"10px"
            }}
            >Genres: {videogame.genres}</Row>
            <Row md={4}
            style={{
              padding:"5px",
              paddingLeft:"10px"
            }}
            >Platforms: {videogame.platforms}</Row>
            <Row md={4}
            style={{
              padding:"5px",
              paddingLeft:"10px"
            }}
            >Rating: {videogame.rating}</Row>
          </Col>
        </Row>
      </div>

      <Footer />
    </Container>
  );
}

