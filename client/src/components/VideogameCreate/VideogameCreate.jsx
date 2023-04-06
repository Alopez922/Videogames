import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { CreateVideogame, getPlatforms } from "../../actions";
import { getGenres,getVideoGames } from "../../actions";
import "./Videogame.css";

function validate(input) {
    const errors = {};
    let regexName = new RegExp("^[a-zA-Z][a-zA-Z0-9\\s]{1,29}$");
    
    if (!input.name || !regexName.test(input.name)) {
      errors.name = "Name is Invalid";
    }
    
    if (!input.rating) {
      errors.rating = "Rating is Required";
    } else if (Number(input.rating) > 5 || Number(input.rating) < 1 || isNaN(Number(input.rating))) {
      errors.rating = "Rating is invalid";
    }
    
    if (!input.releaseDate) {
      errors.releaseDate = "ReleaseDate is Required";
    }
    
    if (!input.description) {
      errors.description = "Description is Required";
    }
    
    if (input.genres.length <= 1) {
      errors.genres = "Selecciona un genero";
    }
    
    if (input.platforms.length < 1) {
      errors.platforms = "Seleccion una Plataforma";
    }
    
    return errors;
  }
  

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);
  const platforms = useSelector((state) => state.platforms);
  const [input, setInput] = useState({
    name: "",
    description: "",
    releaseDate: "",
    rating: "",
    genres: [],
    platforms: [],
    background_image: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    setInput({
      ...input,
      genres: [...new Set([...input.genres, e.target.value])],
    });
    console.log(input);
  }

  function handleSelectPlatforms(e) {
    setInput({
      ...input,
      platforms: [...new Set([...input.platforms, e.target.value])],
    });
    console.log(input);
  }

  function handleDelete(e) {
    setInput({
      ...input,
      genres: input.genres.filter((genres) => genres !== e),
    });
  }

  function handleDeletePlatform(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((platforms) => platforms !== e),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(CreateVideogame(input));
  
    setInput({
      name: "",
      description: "",
      releaseDate: "",
      rating: "",
      genres: [],
      platforms: [],
      background_image: "",
    });
    alert("JUEGO CREADO CON EXITO");
  
    dispatch(getVideoGames()); // Agregar esta línea
  
    history.push("/home");
  }

  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getGenres());
    if (
      input.name === "" ||
      input.genres.length < 1 ||
      input.description === "" ||
      input.releaseDate === "" ||
      input.platforms.length < 1 ||
      input.rating === ""
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [errors, input, setDisableButton]);

  return (
    <div className="contenedor-form">
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
            className={errors.name && "danger"}
          />
          {errors.name && (
            <span className="error">*{errors.name}</span>
          )}
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            step="0.1"
            min="3"
            max="5"
            name="rating"
            value={input.rating}
            onChange={handleChange}
            className={errors.rating && "danger"}
          />
          {errors.rating && (
            <span className="error">*{errors.rating}</span>
          )}
        </div>
        <div>
          <label>ReleaseDate:</label>
          <input
            type="date"
            name="releaseDate"
            value={input.releaseDate}
            onChange={handleChange}
            className={errors.releaseDate && "danger"}
          />
          {errors.releaseDate && (
            <span className="error">*{errors.releaseDate}</span>
          )}
        </div>
        <div>
          <label>Descripcion:</label>
          <input
            type="text"
            name="description"
            value={input.description}
            onChange={handleChange}
            className={errors.description && "danger"}
          />
          {errors.description && (
            <span className="error">*{errors.description}</span>
          )}
        </div>
        <div>
          <label>img:</label>
          <input
            type="text"
            name="background_image"
            value={input.background_image}
            onChange={handleChange}
          />
        </div>
        <div>
  <label>Genres:</label>
  <select name="genres" onChange={handleSelect}>
    {genres.map((el) => (
      <option defaultValue={el.name} key={el.name}>
        {el.name}
      </option>
    ))}
  </select>
</div>
<div>
  {input.genres.map((el) => (
    <div className="lista" key={el} onClick={() => handleDelete(el)}>
      {el}

    </div>
  ))}
</div>
<div>
  <label>Platforms:</label>
  <select name="platforms" onChange={handleSelectPlatforms}>
    {platforms.map((el) => (
      <option value={el} key={el}>
        {el}
      </option>
    ))}
  </select>
</div>
<div>
  {input.platforms.map((el) => (
    <div className="lista" key={el} onClick={() => handleDeletePlatform(el)}>
      {el}
    </div>
  ))}
</div>

        <div>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={disableButton}
          >
            Crear Videogame
          </button>
        </div>
      </form>
    </div>
  );
  
        }  
