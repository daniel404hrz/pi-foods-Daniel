require('dotenv').config();
const {getApiInfo, getApiInfoByName, getDbInfo, getDbInfoByName} = require('./searchers');


const getRecipeByName =async(name)=>{
    if(name){
        const recetasBD = await getDbInfoByName(name)
            
            //EN CASO DE NO ENCONTRARLA BUSCAMOS EN LA API
            
            const apiInfo = await getApiInfoByName(name);

            // si quiero traer recetas de la data y filtrar su nombre manualmente:
             // const filteredRecipes = apiInfo.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));

            if(!apiInfo.length && !recetasBD.length)throw Error('No se encontro receta con ese nombre')
            else{return [...apiInfo,...recetasBD]};
        
        }else{
            // puse esto aunque creo que no lo piden, si al momento de buscar no se le pasa un name,
            // puedo traer por lo menos 100 recetas o mas para que el cliente vea el repertorio. 
            // const apiInfo = await getApiInfo()
            const dbinfo = await getDbInfo()
            const apiInfo = await getApiInfo()
            return [...dbinfo,...apiInfo];
            
            
        }

    }
module.exports = getRecipeByName
// GET | /recipes/name?="..."
// Esta ruta debe obtener todas aquellas recetas que coincidan con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarla independientemente de mayúsculas o minúsculas.
// Si no existe la receta, debe mostrar un mensaje adecuado.
// Debe buscar tanto las de la API como las de la base de datos.
// https://api.spoonacular.com/recipes/complexSearch?query=Fried Anchovies with Sage&apiKey=f4e455022b264d16bb42b0cee26c190d

    