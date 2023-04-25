import { useParams } from "react-router-dom";
import styles from './DetailPage.module.css'
import { useState, useEffect } from "react";
import axios from "axios";
import { URL_BASE } from "../../../redux/actions";
import img from'./img/anonima.webp'
export default function DetailPage (){
    
    const [data, setData] = useState([])
    const { id } = useParams();
    
    useEffect(()=>{
            axios.get(`${URL_BASE}/${id}`)
            .then((response)=>{
            if(response.data)setData(response.data)})
            .catch(error=>alert(error.message))
    },[id])
    return(
        <div >
            {data.title ?(
        <div className={styles.wrapper_box}>
        <h1>{data.title}.</h1>
        <h3>id: {data.id}</h3>
        <h4>Health Score: {data.healthScore}</h4>
        <div className={styles.resumen}>
            
        <p><b>Summary: </b>{data.summary.replace(/<[^>]*>/g, "")}</p>
        
        <img className={styles.recipe_img} src={data.image ? data.image: img} alt={data.title} />
        </div>
        <ul className={styles.diets}><b>Dietas: </b> {data.dietTypes.map(diet=> <li>{diet}</li>)}</ul>
        
        <ol className={styles.lista}><b>Pasos:</b>  {data.steps.length && data.steps.map(steps =><li>{steps.step}</li> )}</ol>

    </div>): (<img className={styles.loading} src='https://art.pixilart.com/ca55d1f91b2cb0d.gif'alt='Loading'/>)}
        </div>
        
        
    )
}
// -  ID.x
// -  Nombre.x
// -  Resumen del plato.x
// -  Nivel de comida saludable (health score).x
// -  Paso a paso.
// -  Imagen.
// -  Tipos de dieta.