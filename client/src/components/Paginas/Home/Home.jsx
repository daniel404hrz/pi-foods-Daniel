import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.css'
import { useEffect, useState} from 'react'
import MapCards from '../../Cards/Home/mapCards';
import { getRecipes } from '../../../redux/actions';
import Selectores from './selectores';
import axios from 'axios';
export default function Home(){

    const dispatch = useDispatch();
    const [diets, setDiets]= useState([])
    const recipesApi=useSelector(state => state.recipes );
    const [recipes, setRecipes] = useState([])
    const [current, setCurrent] = useState(0)
    
    const nextHandler =()=>{
        const totalRecipes =recipesApi.length;
        const nextPage = current +9;
        if (nextPage > totalRecipes)return ;
        else{
            setRecipes([...recipesApi].splice(nextPage,9))
            setCurrent(nextPage)

        }
        
    }
    const PrevHandler =()=>{
        const prevPage = current -9;
        if(prevPage <0 )return;
        
        setRecipes([...recipesApi].splice(prevPage,9))
        setCurrent(prevPage)

    }
    
    useEffect(()=>{
        dispatch(getRecipes())
        axios.get('http://localhost:3001/diets')
        .then(response=>{
            setDiets(response.data)
        })
    },[dispatch])
      
      useEffect(() => {
        setRecipes([...recipesApi].splice(0, 9));
      }, [recipesApi]);
      
    
    
    return(
        <div className={styles.wrapper_box}>
            <Selectores diets={diets}/>
            
            {recipes.length ?<MapCards recipes={recipes}/>:<h2 className={styles.loading}>loading...</h2>}
        <div className={styles.buttons}>
            <button className={styles.button_prev} onClick={PrevHandler}>◀ Anterior</button>
            <button className={styles.button_next} onClick={nextHandler}>Siguente ▶</button>
            
        </div>
            
        </div>
    )
    
}
