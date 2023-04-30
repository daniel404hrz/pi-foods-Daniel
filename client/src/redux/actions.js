import axios from 'axios'
export const API_KEY = '1356dd6bf3f34a3e9538ca6deb9267bf'
// export const URL_BASE = "http://localhost:3001/recipes";
export const URL_BASE = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=40`
export const getRecipes=()=>{
    return async function (dispatch) {
        // const response = await axios.get(`${URL_BASE}`);
        const apiUrl =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=40`);
    
    const apiInfo =  apiUrl.data.results.map(e => {
        return {
            id: e.id,
            image: e.image,
            title: e.title,
            dietTypes: [...e.diets, e.vegetarian ? "vegetarian" : null].filter(Boolean),
            healthScore:e.healthScore
            
        }
    })
    
        dispatch({ type: 'GET_RECIPES', payload: apiInfo });
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
    // const response = await axios.get(`${URL_BASE}?name=${value}`)
    const url = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${value}&apiKey=${API_KEY}&addRecipeInformation=true`);
    const apiInfo = url.data.results.map(e => {
        return {
            id: e.id,
            image: e.image,
            title: e.title,
            dietTypes: e.diets,
            healthScore: e.healthScore,
        }
    })
    
    
    dispatch({type:'SEARCH', payload:apiInfo})
    }
}
export const onSubmit=async(value)=>{
    // const recipe = await axios.post(URL_BASE, value)
    
    return {type:'PUSH', payload:value}

}

     
        

