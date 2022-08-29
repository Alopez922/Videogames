const { Router } = require('express');
// const { getGenres } = require('../controllers/genres');
const {singleVideoGame,postVideogame,getVideoGame} =require("../controllers/videogames")//getVideoGame
const {updateVideogame,deleteVideogame,nombreVideogame} = require  ("../controllers/services")
const {getGenres}=require("../controllers/genres");
const {Platform} = require('../controllers/platforms');



const router = Router()
router.get("/videogames",getVideoGame)
router.put("/videogames/:id",updateVideogame)
router.get(`/videogames/:id`,singleVideoGame)
router.delete("/videogames/:id",deleteVideogame)
router.get("/platforms",Platform)
router.get("/videogames/name/:name",nombreVideogame)

router.post("/videogames",postVideogame)
router.get("/genres",getGenres),

module.exports = router;

