const {getApiInfo,getDbInfo,getAllVideoGames,getSingleVideoGame, videoGameToDb}= require("./services")


//Minuto 50 de los videos de selene

const getVideoGame =async(req,res)=>{
    try{
        const name = req.query.name
        let videogamesTotal = await getAllVideoGames()
        if(name){
            let videogameName = await videogamesTotal.filter(el=>el.name.toLowerCase().includes(name.toLowerCase()))
            videogameName.length?
            res.status(200).send(videogameName):
            res.status(404).send("No existe el juego")
        }else{
            res.status(200).send(videogamesTotal)
        }
    }catch(e){
        return console.log(e)
    }
    }

const singleVideoGame=async(req,res)=>{
    try{
    const id = req.params.id
    if(id.length <= 6){
        const found = await getSingleVideoGame(id)
        return res.send(found)
    }
    const dbVideoGame = await getDbInfo()
    const singleVideoGame = dbVideoGame.find((game)=>game.id===id)

    if(!singleVideoGame){
        return res.status(404).send("VideoGame Not Found")
    }
    return res.send(singleVideoGame)
}catch(e){
    return console.log(e)
}
}



const postVideogame = async(req,res)=>{
    try{
    const foundOrCreated = await videoGameToDb(req.body)
    if(!foundOrCreated){
        return res.status(400).send({message:"Videogame already exists"})
    }
        return res.status(201).send({message:"Videogame Created"})
}catch(e){
    return console.log(e)
}
}





module.exports={singleVideoGame,postVideogame,getVideoGame}