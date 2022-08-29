const {Genre}= require ("../db.js")
const  {genresToBd} = require("./services")


const getGenres = async(req,res)=>{
    try{
    await genresToBd()
    let genres = await Genre.findAll()

    genres = genres.map((genre)=>genre.toJSON())

    const response = genres.map((genre)=>{
        return{
            name:genre.name
        }
    })
    res.send(response)
}catch(e){
    return console.log(e)
}

}

module.exports={getGenres}