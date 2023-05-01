import axios from 'axios'

export const URL_BASE = "https://food-api-1vap.onrender.com/recipes";

export const getRecipes=()=>{
    return async function (dispatch) {
       const response = await axios.get(`${URL_BASE}`);
   
        dispatch({ type: 'GET_RECIPES', payload: response.data });
    }

};
export const filterRecipes=(diet)=>{
    return {type:'FILTER',payload:diet}
}
export const orderRecipes=(order)=>{
    return {type:'ORDER', payload:order}

}
export const onSearch=(value)=>{
    return async function (dispatch) {
    const response = await axios.get(`${URL_BASE}?name=${value}`)
    
    
    
    dispatch({type:'SEARCH', payload:response.data})
    }
}
export const onSubmit=async(value)=>{
    const recipe = await axios.post(URL_BASE, value)
    return recipe.data

}

     
        

