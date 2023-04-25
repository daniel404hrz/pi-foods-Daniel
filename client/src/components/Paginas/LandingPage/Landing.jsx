import styles from './landing.module.css'
import { useState, useEffect } from "react";
import LandingCard from '../../Cards/landing/landingCard';
import {NavLink } from 'react-router-dom';


export default function Landing(){
    
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScroll(window.pageYOffset > 0);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  
    return (
        <div className={styles.wrapper_box}>
            <div className={scroll? styles.caja_landing: styles.caja_scroll}>
                <h1 className={styles.titulo}>¡Bienvenido a mi proyecto integrador de Henry 👨‍🍳! </h1>
            </div>
            <div className={styles.card}>
                <LandingCard />
                <div className={styles.caja_spam}>
                    <h2>¡Haz clic en Home y descubre deliciosas recetas 😋! </h2>
                      <NavLink to={'/home'} className={styles.NavButton}>Home</NavLink>
                </div>
            </div>
            <footer className={styles.footer}>
                <ul>
                    <li>Github</li>
                    <li>Henry</li>
                    <li>Contacto: daniel.404hrz@gmail.com </li>
                </ul>
            </footer>
        </div>
    )
        
        

}