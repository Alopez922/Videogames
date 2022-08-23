const {getPlatforms} = require ("./services")

// const platforms = async(req,res)=>{
    
//     let platformsTotal = await getPlatforms()
//     console.log(platformsTotal)
    
//    if(!platformsTotal){
//     return res.status(404).send("No existe la plataforma")
//    }else{
//     res.status(200).send(platformsTotal)
//    }

// }

const Platform = async(req,res)=>{
    let allPlatforms= await getPlatforms()
    if(!allPlatforms){
        return res.status(404).send("no existe la plataforma")
    }else{
        res.status(200).send(allPlatforms)
    }
}



module.exports ={Platform}