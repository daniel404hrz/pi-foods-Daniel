
import styles from './HomeCard.module.css'
import {NavLink } from 'react-router-dom';
import anonima from './img/anonima.webp'
import { useEffect, useState } from 'react';

export default function HomeCards ({id ,image,title, dietTypes, healthScore}){
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 500);

    useEffect(() => {
      function handleResize() {
        setIsSmallScreen(window.innerWidth <= 500);
      }
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    return (
        <div  className={isSmallScreen ? styles.small_caja : styles.card }>
            <div className={isSmallScreen ? styles.small_details : styles.details }>
               
               <NavLink to={`/detail/${id}`} className={styles.link}><h2>
                   {title}
               </h2></NavLink>
               
               <div className={isSmallScreen ? styles.small_diets : styles.diets}>
               <b>Diets:</b>
                {dietTypes.map(diet=> <li key={diet}>{diet}</li>)}
                </div>
                <b className={styles.health}>healthScore: {healthScore}</b>
               
               
           </div>
            <img src={image ? image:anonima} alt="receta" className={isSmallScreen ? styles.small_img : styles.img }/>
            
            
        </div>
        
    )
//     Imagen.
// Nombre.
// Tipos de dietas.
}