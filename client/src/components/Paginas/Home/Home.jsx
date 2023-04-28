import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.css'
import { useEffect, useState} from 'react'
import MapCards from '../../Cards/Home/mapCards';
import { getRecipes } from '../../../redux/actions';
import Selectores from './selectores';

export default function Home({diets}){

    const dispatch = useDispatch();
    
    const recipesApi=useSelector(state => state.recipes );
    const [recipes, setRecipes] = useState([])
    const [current, setCurrent] = useState(0)

    
    
    const totalPages = Math.ceil(recipesApi.length / 9);

    const nextHandler =()=>{
        const totalRecipes =recipesApi.length;
        const nextPage = current + 1;
        const index = nextPage * 9;
        if (index > totalRecipes-1)return ;
        else{
            setRecipes([...recipesApi].splice(index,9))
            setCurrent(nextPage)

        }
        
    }
    
    const PrevHandler =()=>{
        const prevPage = current -1;
        if(prevPage <0 )return;
        const index = prevPage * 9
        setRecipes([...recipesApi].splice(index,9))
        setCurrent(prevPage)

    }
    const handleClick = (event, pageNumber) => {
        event.preventDefault();
        
        const index = pageNumber * 9;
        setRecipes([...recipesApi].splice(index,9))
        setCurrent(pageNumber)
        
        
      };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(
            <p key={i} onClick={(e) => handleClick(e, i-1)} tabIndex="0" >
              {i}
            </p>
          );
        }
        return (
          <div className={styles.pageNumbers}>
            {pageNumbers}
          </div>
        );
      };
    
    useEffect(()=>{
      
        !recipesApi.length && dispatch(getRecipes())
        
    },[dispatch, recipesApi])
      
      useEffect(() => {
        setRecipes([...recipesApi].splice(0, 9));
      }, [recipesApi]);
      
    
    
    return(
        <div className={styles.wrapper_box}>
            <Selectores diets={diets}/>
            
            {recipes.length ?<MapCards recipes={recipes}/>:<h2 className={styles.loading}>loading...</h2>}
        <div className={styles.buttons}>
            <button className={styles.button_prev} onClick={PrevHandler}>◀ Anterior</button>
            {renderPagination()}
            <button className={styles.button_next} onClick={nextHandler}>Siguente ▶</button>
            
        </div>
            
        </div>
    )
    
}
