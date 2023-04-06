import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCreated, filterByGenres, getGenres, getPlatforms, getVideoGames,orderByName, filterRating, orderByRating, filterByPlatform} from "../../actions";
import GameCard from "../Card/GameCard";
import Paginado from "../Paginado/Paginado";
import Loading from "../Loading/loading";// julio
import NavTittle from "../NavTittle/NavTittle";
import SearchBar from "../SearchBar/Searchbar";
import Filter from "../Filtros/Filter";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner"
import "./home.css"


export default function Home() {
  const dispatch = useDispatch();
  const allVideoGames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state)=>state.genres);
  const loading = useSelector(state=>state.loading) //esto de julio

  //PAGINADO  NADA MAS
  const [currentPage, setCurrentPage] = useState(1);
  const [videoGamesPerPage] = useState(6);
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
      <NavTittle />
      <Banner/>
      
      {currentVideoGames.length === 0 && <Loading />}

      <SearchBar setCurrentPage={setCurrentPage} />
      <Filter
        setCurrentPage={setCurrentPage}
        orderByName={orderByName}
        orderByRating={orderByRating}
        filterByCreated={filterByCreated}
        filterByGenres={filterByGenres}
        setOrden={setOrden}
        getVideoGames={getVideoGames}
        filterRating={filterRating}
        filterByPlatform={filterByPlatform}
      />
  
 
  
      
  
      <div className="row row-cols-5 g-2 card-container">
        {currentVideoGames.map((el) => (
          <div className="col">
            <GameCard
              name={el.name}
              background_image={el.background_image}
              genres={el.genres}
              id={el.id}
              rating={el.rating}
            />
          </div>
        ))}
      </div>

      <Paginado
        videoGamesPerPage={videoGamesPerPage}
        allVideoGames={allVideoGames.length}
        paginado={paginado}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Footer/>
    </div>
  );
      }
 
   

