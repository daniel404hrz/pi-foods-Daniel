
import styles from './HomeCard.module.css'
import {NavLink } from 'react-router-dom';
import anonima from './img/anonima.webp'

export default function HomeCards ({id ,image,title, dietTypes}){
   
    return (
        <div  className={styles.card }>
            <div className={styles.details}>
               
               <NavLink to={`/detail/${id}`} className={styles.link}><h2>
                   {title}
               </h2></NavLink>
               
               <div className={styles.diets}>
               <p>Diets:</p>
                {dietTypes.map(diet=> <li>{diet}</li>)}
                </div>
               
               
           </div>
            <img src={image ? image:anonima} alt="receta" className={styles.img}/>
            
            
        </div>
        
    )
//     Imagen.
// Nombre.
// Tipos de dietas.
}