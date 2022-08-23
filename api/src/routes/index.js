const { Router } = require('express');
// const { getGenres } = require('../controllers/genres');
const {getVideoGame,singleVideoGame,postVideogame} =require("../controllers/videogames")
const {updateVideogame,deleteVideogame} = require  ("../controllers/services")
const {getGenres}=require("../controllers/genres");
const {Platform} = require('../controllers/platforms');



const router = Router()
router.get("/videogames",getVideoGame)
router.put("/videogames/:id",updateVideogame)
router.get(`/videogames/:id`,singleVideoGame)
router.delete("/videogames/:id",deleteVideogame)
router.get("/platforms",Platform)

router.post("/videogames",postVideogame)
router.get("/genres",getGenres),

module.exports = router;

