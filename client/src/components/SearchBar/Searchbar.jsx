import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { SearchVideogame } from "../../actions";
import "./SearchBar.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const allVideoGames = useSelector((state) => state.videogames);

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const filteredGames = allVideoGames.filter((game) => {
      return game.name.toLowerCase().trim().includes(name.toLowerCase().trim());
    });

    if (filteredGames.length > 0) {
      dispatch(SearchVideogame(name));
      setName("");
      setCurrentPage(1);
    } else {
      alert(`El juego ${name} no existe`);
      setName("");
      dispatch(SearchVideogame(""));
      setCurrentPage(1);
    }
  }

  return (
    <Form className="Container-searchbar" onSubmit={(e) => handleSubmit(e)} inline>
      <Form.Control
        className="mr-sm-2 custom-input"
        type="text"
        value={name}
        placeholder="Buscar..."
        style={{
          // backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(4px)',
          borderColor: "#9400D3",
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
          color: 'black',
          fontWeight: '800',
        }}
        onChange={(e) => handleInputChange(e)}
      />
      <Button variant="outline-success" type="submit" className="btn btn-custom">
        Buscar
      </Button>
    </Form>
  );
}
