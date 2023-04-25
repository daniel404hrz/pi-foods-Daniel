const initialState = {
    recipes: [],
    allRecipes:[],
    
  };

const reducer=(state = initialState, action) =>{
    switch(action.type){
        case 'GET_RECIPES':
            return { ...state, recipes:action.payload, allRecipes:action.payload}
        case 'FILTER':
            if(action.payload === 'All') return {...state, recipes:state.allRecipes}
            else if(action.payload === 'bdRecipes'){
                return{...state,recipes:state.allRecipes.filter(recipe => recipe.bdRecipe)}}
            else if(action.payload === 'ApiRecipes'){
                return{...state,recipes:state.allRecipes.filter(recipe => !recipe.bdRecipe)}}
            else return{...state, recipes: state.allRecipes.filter(recipe => recipe.dietTypes.includes(action.payload))}
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