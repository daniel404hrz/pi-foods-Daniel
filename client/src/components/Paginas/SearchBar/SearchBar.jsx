import styles from './SearchBar.module.css'
import {NavLink, useLocation } from 'react-router-dom';
import logo from '../img/logo-removebg-preview.png'
import { useState } from 'react';
import { onSearch } from '../../../redux/actions';
import { useDispatch } from 'react-redux';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [value,setValue]=useState('')
    const handleClick=(value)=>{
        if(value === 'repositorio'){
            window.open('https://github.com/daniel404hrz', '_blank');
        }
    }
    const inputChange =(event)=>{
        setValue(event.target.value)

    }
    const handleSearch=()=>{
        dispatch(onSearch(value))
        setValue('')
    }
    const location = useLocation();
    return(
        <div className={styles.Bar_box}>
           
            <img src={logo}alt="logo" className={styles.logo} />
            
            <div className={styles.links_box}>
            <NavLink to={'/'} className={styles.Bar_search}>Inicio</NavLink>
            <NavLink to={'/home'} className={styles.Bar_search}>Home</NavLink>
            <NavLink to={'/form'} className={styles.Bar_search}>New recipe</NavLink>
            <button onClick={() => handleClick('repositorio')} className={styles.Bar_search}>Github</button>
            
            </div>
           
            {!location.pathname.includes('/detail/') && !location.pathname.includes('/form') &&<div className={styles.caja_input}>
            <label for= 'buscar'>🔎</label>
            <input id='buscar' type="text" value={value} onChange={inputChange}/>
            <button id='buscar' onClick={handleSearch}>Buscar</button>
            </div> }
            
        </div>
    )
}