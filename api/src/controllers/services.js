const {Videogame,Genre} = require("../db")
const axios = require("axios")



const apiKey = "6ab40e6dfa1543679b7996c536482ab3"

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
    try{
    const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&page_size=40&page=`
    let apiData =[]

    await Promise.all([axios.get(apiUrl+1),axios.get(apiUrl+2),axios.get(apiUrl+3)])
    .then((responses)=>{
    apiData=responses[0].data.results.concat(responses[1].data.results).concat(responses[2].data.results)

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
}catch (e){
   return console.log(e)
}
    }




const getDbInfo = async()=>{
    try{
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
}catch(e){
 return console.log(e)
}
}

const getAllVideoGames = async()=>{
    try{
    const videogameinfo = await getApiInfo();
    const DbInfo = await getDbInfo();
    const infoTotal = videogameinfo.concat(DbInfo)
    return infoTotal
    }catch (e){
        return console.log(e)
    }
}


const getSingleVideoGame = async(id)=>{
    try{
    const singleVideoGame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
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
}catch(e){
    return console.log(e)
}
}

// const nombreVideogame = async (name) => {
 
//         const apiName = await axios.get(`https://api.rawg.io/api/games?key=65af402a5f674b1fa4538479951975b8&search=${name}`);
//         const Name = {
//                 id: apiName.data.id,
//                 image: apiName.data.background_image,
//                 genres: apiName.data.genres?.map((genre) => genre.name),
//                 rating: apiName.data.rating,
// }
// return Name
// }

const nombreVideogame = async (req, res) => {
    try {
        
        const {name} = req.params;
        
        const apiName = await axios.get(`https://api.rawg.io/api/games?key=${apiKey}&search=${name}`);
        
        let result 
        if (name) {
        result = apiName.data.results.map((game) => ({
                id: game.id,
                name:game.name,
                image: game.background_image,
                genres: game.genres?.map((genre) => genre.name),
                rating: game.rating,
            }))}
            console.log(result)
            res.status(201).send(result);
    } catch (e) {
        console.log(e)
        res.status(404).send("no funciona")
    }
}

const videoGameToDb =async(data)=>{
    try{
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
}catch(e){
    return console.log(e)
}  
}

// const getPlatforms = async()=>{
//     const apiUrlPlatforms = await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=${apiKey}`)
//     const platformsInfo = apiUrlPlatforms.data.results.map(platform => platform.platforms.map(e=>e.name))

//    return platformsInfo.flat(1)

// }

const getPlatforms = async()=>{
    try{
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
    }catch(e){
        return console.log(e)
    }
}



const genresToBd = async()=>{
    try{
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${apiKey}`)
    const respuestaGenre = genresApi.data.results.map((genre)=>{return {name:genre.name}})

    const genresfromDb = await Genre.findAll()
    if(genresfromDb.length===0){
        await Genre.bulkCreate(respuestaGenre)
    }
}catch(e){
    return console.log(e)
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



//probando

        




module.exports ={
    getAllVideoGames,
    getApiInfo,
    getDbInfo,
    genresToBd,
    getSingleVideoGame,
    videoGameToDb,
    getPlatforms,
    updateVideogame,
    deleteVideogame,
    nombreVideogame    
   
}