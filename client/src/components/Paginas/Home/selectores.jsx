import { useDispatch } from 'react-redux';
import styles from './Home.module.css'
import { filterRecipes,orderRecipes } from '../../../redux/actions';
export default function Selectores({diets}){
    const dispatch = useDispatch();
    const FilterDispatch=(event)=>{
        dispatch(filterRecipes(event.target.value))

    }
    const OrderDispatch=(event)=>{
        dispatch(orderRecipes(event.target.value))
    }
    return(
        <div className={styles.barras}>
            <div className={styles.select_diets}>
            <label htmlFor="origen">Origen</label>
                <select id="origen" onChange={FilterDispatch}>
                <option value="All">All</option>
                <option value="bdRecipes">bdRecipes</option>
                <option value="ApiRecipes">ApiRecipes</option>
                </select>
            </div>
            <div className={styles.select_diets}>
                <label htmlFor="filter">DietTypes: </label>
            <select id='filter' onChange={FilterDispatch}>
                <option value="All">All</option>
                {diets.map(dieta=><option key={dieta} value={dieta}>{dieta}</option>)}
            </select>
            </div>
            <div className={styles.select_diets}>
                <label htmlFor="ordenar">Ordenar: </label>
                <select id="ordenar" onChange={OrderDispatch}>
                    <option value='None'>None</option>
                    <option value="ascendente">Ascendente</option>
                    <option value="descendente">Descendente</option>
                    <option value="health score">Health score</option>
                </select>
            </div>
            
        </div>
        
    )
}