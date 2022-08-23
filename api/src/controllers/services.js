const {Videogame,Genre} = require("../db")
const axios = require("axios")



const apiKey = "65af402a5f674b1fa4538479951975b8"

// const getApiInfo = async()=>{
//     const allinfo = []
//     for (let i = 1; i<=5;i++){
//     const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=${i}`)
//     const videogameinfo = apiUrl.data.results.map(videojuego => {
//         return {
//             id: videojuego.id,
//             name: videojuego.name,
//             background_image: videojuego.background_image,
//             rating:videojuego.rating,
//             genres:videojuego.genres.map(e => e.name).join(", "),
//             platforms:videojuego.platforms.map(e => e.platform.name),
//             released:videojuego.released,
//             description:videojuego.description
//         };
//     })
//   allinfo.push(videogameinfo)
// }
// return allinfo.flat(1)
// }

const getApiInfo = async()=>{
    const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=40&page=`
    let apiData =[]

    await Promise.all([axios.get(apiUrl+1),axios.get(apiUrl+2),axios.get(apiUrl+3)])
    .then((responses)=>{
    apiData=responses[0].data.results.concat(responses[1].data.results.concat).concat(responses[2].data.results)

    })
    return apiData.map((videojuego)=>({
        id: videojuego.id,
        name: videojuego.name,             
        background_image: videojuego.background_image,
        rating:videojuego.rating,
        genres:videojuego.genres?.map(el=>el.name).join(", "),
        platforms:videojuego.platforms?.map(e => e.platform.name),
        released:videojuego.released,
        description:videojuego.description
    }))
    }




const getDbInfo = async()=>{
    const videogameDb = await Videogame.findAll({
        include:{
            model:Genre,
            attributes:["name"],
           
        }
    })

    const videogameMap = videogameDb.map((game)=>{
        return{
            id:game.dataValues.id,
            name:game.dataValues.name,
            description:game.dataValues.description,
            released:game.dataValues.releaseDate,
            rating:game.dataValues.rating,
            background_image:game.dataValues.background_image,
            platforms:game.dataValues.platforms,
            genres:game.dataValues.genres.map((e)=>e.dataValues.name).join(", ")
        }
    })
    return videogameMap
}

const getAllVideoGames = async()=>{
    const videogameinfo = await getApiInfo();
    const DbInfo = await getDbInfo();
    const infoTotal = videogameinfo.concat(DbInfo)
    return infoTotal
}




const getSingleVideoGame = async(id)=>{
    const singleVideoGame = await axios.get(`https://api.rawg.io/api/games/${id}?key=65af402a5f674b1fa4538479951975b8`)
    const videoGame ={
        id: singleVideoGame.data.id,
        name: singleVideoGame.data.name,
        background_image: singleVideoGame.data.background_image,
        description: singleVideoGame.data.description_raw,
        rating:singleVideoGame.data.rating,
        genres:singleVideoGame.data.genres.map(e => e.name).join(", "),
        platforms:singleVideoGame.data.platforms.map(e => e.platform.name).join(", "),
        released:singleVideoGame.data.released
                                 

    }
    return videoGame
}

const videoGameToDb =async(data)=>{
    const {name,background_image,rating,genres,platforms,releaseDate,description}=data
    const [videogame,created]= await Videogame.findOrCreate({
        where:{name},
        defaults:{
            background_image,
            rating,
            platforms,
            releaseDate,
            description,
            
        }
        
        
    })

    if(created){
        const foundGenres = await Genre.findAll({
            where:{
                name:genres
            }
        })
        await videogame.addGenres(foundGenres)
        return videogame
    }  
}

// const getPlatforms = async()=>{
//     const apiUrlPlatforms = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${apiKey}`)
//     const platformsInfo = apiUrlPlatforms.data.results.map(platform => platform.platforms.map(e=>e.name))

//    return platformsInfo.flat(1)

// }

const getPlatforms = async()=>{
    const allinfo = []
    for (let i = 1; i<=4;i++){
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&page=${i}`)
    const videogameinfo = apiUrl.data.results.map(videojuego => {
        return {
            platforms:videojuego.platforms.map(e => e.platform.name),
        };
    })
allinfo.push(videogameinfo.map(el=>el.platforms).flat(2))
    }
const unico =[...new Set(allinfo.flat())]
return  unico
}



const genresToBd = async()=>{
    const genresApi = await axios.get("https://api.rawg.io/api/genres?key=65af402a5f674b1fa4538479951975b8")
    const respuestaGenre = genresApi.data.results.map((genre)=>{return {name:genre.name}})

    const genresfromDb = await Genre.findAll()
    if(genresfromDb.length===0){
        await Genre.bulkCreate(respuestaGenre)
    }
}

const updateVideogame = async(req,res,next)=>{
    const id = req.params.id;
    const videogames = req.body;

    return Videogame.update(videogames,{
        where:{
            id,
        }
    })
    .then((updateVideogame)=>{
        res.send(updateVideogame);
    })
    .catch((error)=>next(error))
}



const deleteVideogame = async(req,res,next)=>{
    const id = req.params.id;
    return Videogame.destroy({
        where:{
            id,
        },
    })
    .then(()=>{
        res.sendStatus(200)
    })
    .catch((error)=>next(error))
}







module.exports ={
    getAllVideoGames,
    getApiInfo,
    getDbInfo,
    genresToBd,
    getSingleVideoGame,
    videoGameToDb,
    getPlatforms,
    updateVideogame,
    deleteVideogame    
   

}