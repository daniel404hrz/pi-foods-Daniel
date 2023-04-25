require('dotenv').config();
const {API_KEY} = process.env;
const {Recipe, Diets} = require('../db')
const axios = require('axios')
const { Op } = require('sequelize');

const getApiInfo = async () => {
    const apiUrl =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=20`);
    
    const apiInfo = await apiUrl.data.results.map(e => {
        return {
            id: e.id,
            image: e.image,
            title: e.title,
            dietTypes: [...e.diets, e.vegetarian ? "vegetarian" : null].filter(Boolean),
            healthScore:e.healthScore
            
        }
    })
    
    return apiInfo;
};
const getApiInfoByName = async(name)=>{
    const url = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${name}&apiKey=${API_KEY}&addRecipeInformation=true`);
    const apiInfo = url.data.results.map(e => {
        return {
            id: e.id,
            image: e.image,
            title: e.title,
            dietTypes: e.diets,
            healthScore: e.healthScore,
        }
    })
    
    return apiInfo;
}
const getApiInfoById = async (ID) => {
    const recetaAPI = await axios(`https://api.spoonacular.com/recipes/${ID}/information?apiKey=${API_KEY}`) 
    const toSteps=(arr)=> {
        const result = arr[0].steps.map(n => {
            return {
              number :n.number,
              step:n.step
            };
            
          });
          return result
        }
         
    
    const {id,image,title,diets,summary,spoonacularScore,healthScore,analyzedInstructions} = recetaAPI.data
    
    return {id,image,title,dietTypes:diets,summary,spoonacularScore,healthScore,steps:toSteps(analyzedInstructions)};
};


const getDietsInfo=async()=>{
    const apiUrl =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const dietas = []
    const response = apiUrl.data.results.flatMap((receta)=> receta.diets)
    apiUrl.data.results.forEach((receta) => {
        if (receta.vegetarian && !dietas.includes("vegetarian")) {
          dietas.push("vegetarian");
        }
      });
    response.forEach((element)=>{
        if(!dietas.includes(element)){
            dietas.push(element)
        }
    });
    
    return dietas
}
const getDbInfoByName=async(name)=>{
    const result = await Recipe.findAll({
        where: {
            title: {
              [Op.iLike]: `%${name}%`
            }
          },
        include: {
            model: Diets,
            as: 'dietTypes',
            attributes: ['name'],
            through: {
                attributes: [],
            }
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    return newResult(result)

}
const newResult=(arr)=>{
    if(arr.length){
        const result = arr.map(recipe => {
            const dietTypes = recipe.dietTypes.map(diet => diet.name);
            return { ...recipe.toJSON(), dietTypes };
          });
          return result
    }else return []
    
      
      

}
const getDbInfo = async () => {   
    const result = await Recipe.findAll({
        include: {
            model: Diets,
            as: 'dietTypes',
            attributes: ['name'],
            through: {
                attributes: [],
            }
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    });
    
    
      return newResult(result)
    
}
module.exports = {getApiInfo,getDbInfo,getApiInfoByName,getDietsInfo ,getApiInfoById,getDbInfoByName}