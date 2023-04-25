const { Router } = require('express');
const getDetailByID = require('../controllers/getDetailByID')
const getRecipeByName = require('../controllers/getRecipeByName')
const postRecipe = require('../controllers/postRecipe')
const {getDietsInfo}=  require('../controllers/searchers')
const {Diets} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/recipes/:idRecipe', async (req,res)=>{
    
    try {
        const {idRecipe} = req.params;
        
        const detail = await getDetailByID(idRecipe)
        res.status(200).json(detail)
        
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
})
router.get('/recipes', async(req,res)=>{
    try {
        const {name}= req.query;
        const recetas = await getRecipeByName(name)
        res.status(200).json(recetas)
        
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
})
router.get('/diets', async(req,res)=>{
    try {
        const dietas = await getDietsInfo()
        for (const name of dietas) {
            await Diets.findOrCreate({
              where: { name }
            });
          }
        const dietTypes = await Diets.findAll({attributes: {
            exclude: ['createdAt', 'updatedAt']
          }});
        res.send(dietTypes)
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
})

router.post('/recipes', async(req,res)=>{
    try {
        const data = req.body;
        const ok = await postRecipe(data);
        res.status(200).send(ok)

    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


// 📍 GET | /recipes/name?="..."
// Esta ruta debe obtener todas aquellas recetas que coincidan con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarla independientemente de mayúsculas o minúsculas.
// Si no existe la receta, debe mostrar un mensaje adecuado.
// Debe buscar tanto las de la API como las de la base de datos.

module.exports = router;
