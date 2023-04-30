const initialState = {
    recipes: [],
    allRecipes:[],
    addRecipes:[]
  };


const reducer=(state = initialState, action) =>{
    switch(action.type){
        case 'GET_RECIPES':
            return { ...state, recipes:action.payload, allRecipes:action.payload}
        case 'FILTER':
            if(action.payload === 'All') return {...state, recipes:state.allRecipes}
            else if(action.payload === 'bdRecipes'){
                const obj = {...state,recipes:state.allRecipes.filter(recipe => recipe.bdRecipe)}
                return obj.recipes.length ? obj :{...state,recipes:[false]}
            }
                
            else if(action.payload === 'ApiRecipes'){
                const obj  ={...state,recipes:state.allRecipes.filter(recipe => !recipe.bdRecipe)}
                return obj.recipes.length ? obj :{...state,recipes:[false]}
            }
            else {
                const obj = {...state, recipes: state.allRecipes.filter(recipe => recipe.dietTypes.includes(action.payload))}
                return obj.recipes.length ? obj :{...state,recipes:[false]}
            }
        case 'ORDER':
            if(action.payload === 'None')return {...state, recipes:state.recipes}
            else if(action.payload === 'ascendente')return {...state, recipes:[...state.recipes].sort((a, b) => a.title.localeCompare(b.title))}
            else if(action.payload === 'descendente')return {...state, recipes:[...state.recipes].sort((a, b) => b.title.localeCompare(a.title))}
            else if(action.payload === 'health score')return{...state, recipes:[...state.recipes].sort((a,b)=> a.healthScore - b.healthScore)}
            break
        case 'SEARCH':
            return {...state,recipes:action.payload, allRecipes:action.payload}
       
        default:
            return{...state}
       
        
    }
    
}
export default reducer