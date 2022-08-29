import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import  {Link, useHistory} from "react-router-dom";
import { CreateVideogame, getPlatforms } from "../../actions";
import { getGenres } from "../../actions";
import "./Videogame.css"

function validate(input){
    const errors={}
    let regexName = new RegExp("^[a-zA-Z]{2,30}$");
    if(!input.name || !regexName.test(input.name)){
        errors.name = "Name is Invalid";
    }else if (!input.rating){
        errors.name = "Rating is Required"
    }else if (Number(input.rating)>5 || Number(input.rating)< 1 || isNaN(Number(input.rating))) {
        errors.name = 'Rating is invalid';
    }else if(!input.releaseDate){
        errors.name = "ReleaseDate is Required";
    }else if(!input.description){
        errors.name = "Description is Required"
    }else if(input.genres.length <= 1){
        errors.name = "Selecciona un genero"
    }if(input.platforms.length<1){
        errors.platforms = "Seleccion una Plataforma"
    }
    return errors
    
}



export default function VideogameCreate(){
    const dispatch = useDispatch();
    const history = useHistory()
    const genres = useSelector((state)=>state.genres)
    const platforms = useSelector((state)=>state.platforms)
    const [input,setInput]=useState({
        name:'',
        description:'',
        releaseDate:'',
        rating:'',
        genres:[],
        platforms:[],
        background_image:'',
        
    })

    const [errors,setErrors] = useState({});
    

function handleChange(e){
    
    setInput({
        ...input,
        [e.target.name]:e.target.value
        
    })
  
    setErrors(validate({
        ...input,
        [e.target.name]:e.target.value
    }))
    
}

function handleSelect(e){
    setInput({
        ...input,
        genres:[...new Set([...input.genres,e.target.value])],
    })
    console.log(input)
}

function handleSelectPlatforms(e){
    setInput({
        ...input,
        platforms:[...new Set([...input.platforms, e.target.value])],
    })
    console.log(input)
}

function handleDelete(e){
    setInput({
        ...input,
        genres:input.genres.filter(genres=>genres !== e)
    })
}

function handleDeletePlatform(e){
    setInput({
        ...input,
        platforms:input.platforms.filter(platforms=> platforms !== e)
    })
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(CreateVideogame(input))

    setInput({
        name:"",
        description:"",
        releaseDate:"",
        rating:"",
        genres:[],
        platforms:[],
        background_image: "",
    })
    alert("JUEGO CREADO CON EXITO")
    history.push("/home")
}

const [disableButton, setDisableButton]=useState(true)


    useEffect(() => {
        dispatch(getPlatforms());
        dispatch(getGenres());
        if(input.name ===""||
        input.genres.length<1||
        input.description===""||
        input.releaseDate===""||
        input.platforms.length<1||
        input.rating===""
        )
       {
        setDisableButton(true)
       }else{
        setDisableButton(false)
       }
        
      }, [errors,input,setDisableButton]);


    return(
        <div className="contenedor">
        <div className="fondoCreate">
            <form  onSubmit={(e)=>handleSubmit()} className="form">
                <div>
                    <label>Nombre:</label>
                    <input type="text"
                    className={errors.name && "danger"} 
                    name="name"
                    // defaultValue={input.name}
                    value={input.name}
                    onChange={handleChange} 
                    
                    />
                </div>

                <div>
                    <label>Rating:</label>
                    <input type="number" step="0.1" min="3" max="5"  name="rating" onChange={handleChange} defaultValue={input.rating} className={errors.rating && "danger"} />
                </div>

                <div>
                    <label>ReleaseDate:</label>
                    <input type="date"  name="releaseDate" onChange={handleChange} className={errors.releaseDate && "danger"} />
                </div>

                <div>
                    <label>Descripcion:</label>
                    <input type="text" name="description" defaultValue={input.description} onChange={handleChange} className={errors.description && "danger"}/>
                </div>
                
                
                <div>
                    <label>img:</label>
                    <input type="text" name="background_image" onChange={handleChange}/>
                </div>
                <div>  
                    <label>generos:</label>
                    <select name="genres"  onChange={(e)=>handleSelect(e)}>
                        {genres.map(el=>(
                             
                            <option defaultValue={el.name} key={el.name}>{el.name}</option>
                            
                        ))}
                    </select>
                    </div>
                    {
                        input.genres.map(el=> 
                            
                                <div className="lista" key={el}>
                                    
                                {el}
                                <button type="button"  onClick={()=>handleDelete(el)}>X</button>
                                </div>
                          
                            
                            )}
          
               <div> 
                <label>Platforms</label>
                    <select name="platforms" onChange={(e)=>handleSelectPlatforms(e)}>
                        {platforms.map((el)=>(
                            <option value={el} key={el}>{el}</option>
                        ))}
                    </select>
                </div>
                   
                    {input.platforms.map(el=>
                            <div key={el}>
                                {el}
                                <button onClick={()=>handleDeletePlatform(el)}>X</button>
                            </div>
                            
                            )}
                           
                            <div className="error"> 
                           {errors.name &&(
                            <p>{errors.name}</p>)}
                            </div>

                <div className="botones-ordenados">  
        <button type="submit" onClick={(e)=>handleSubmit(e)} disabled={disableButton}>Crear Videogame </button>
        <Link to="/home">
        <button>Go Back</button>
        </Link>
      </div>
            </form>
        </div>
        </div>
    )
}