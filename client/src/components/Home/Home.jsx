import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCreated, filterByGenres, getGenres, getPlatforms, getVideoGames,orderByName, filterRating, orderByRating, filterByPlatform} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import "./home.css"
import NavBar from "../Nav/Nav";
import Loading from "../Loading/loading";// julio

export default function Home() {
  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state)=>state.genres);
  const loading = useSelector(state=>state.loading) //esto de julio

  //PAGINADO  NADA MAS
  const [currentPage, setCurrentPage] = useState(1);
  const [videoGamesPerPage] = useState(15);
  const indexOfLastVideoGame = currentPage * videoGamesPerPage;
  const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPerPage;
  const currentVideoGames = allVideoGames.slice(
    indexOfFirstVideoGame,
    indexOfLastVideoGame
  );

  const [loaded, setLoaded] = useState(allVideoGames.length?true:false) //esto es lo que dice marco
  
  const [orden,setOrden]=useState("")

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //HASTA AQUI TERMINA EL PAGINADO

  useEffect(() => {
    if(!loaded){
    dispatch(getVideoGames());
    dispatch(getGenres());
    dispatch(getPlatforms())
    }
  }, [loaded,dispatch]);

  
  return (
    <div className="Home-container">
      <div>  
<h1 className="Titulo-Home">Video Games</h1>
      </div>
<div className="NavBar"> 
<NavBar setCurrentPage={setCurrentPage} orderByName={orderByName} orderByRating={orderByRating} filterByCreated ={filterByCreated}filterByGenres ={filterByGenres} setOrden={setOrden} filterRating={filterRating} filterByPlatform={filterByPlatform}  />
</div>
     
<Paginado videoGamesPerPage={videoGamesPerPage} allVideoGames={allVideoGames.length}  paginado={paginado}/>
       
  {loading && <Loading/>} 
       
 <div className="positions">
  {currentVideoGames.map((el) => (
 <div key={el.id}>

<Card name={el.name} background_image={el.background_image} genres={el.genres} id={el.id} />
</div>
))}
</div>
</div>

 
  );
}
