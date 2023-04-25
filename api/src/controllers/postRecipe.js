
const { Recipe, Diets } = require('../db')


const postRecipe =async(data)=>{
    
    const { title, summary, score, healthScore, steps, dietTypes,image } = data;
    if(!title || !summary || !dietTypes.length) throw Error('faltan datos')
    const newRecipe = await Recipe.create({
        title,
        summary,
        image,
        score,
        healthScore,
        steps: steps.length? steps.split(',').map(paso => ({step: paso})):[],
        dietTypes,
        
    })
    
   
    let diet_RecipeDb = await Diets.findAll({
        where: {name: dietTypes}
    })
    
    if (!diet_RecipeDb.length) {
        throw Error('No se encontraron tipos de dieta válidos.');
    }
    else{
        await newRecipe.addDietTypes(diet_RecipeDb)
        return newRecipe
    }
};

module.exports = postRecipe;