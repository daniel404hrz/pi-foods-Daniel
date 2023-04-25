require('dotenv').config();
const {Recipe, Diets} = require('../db');
const {getApiInfoById} = require('./searchers');


const getDetailByID = async(ID)=>{
    if (/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(ID)) {
        const recetaBD = await Recipe.findOne({
            where: { id: ID },
            include: {
                model: Diets,
                as: 'dietTypes',
                attributes: ['name'],
                through: {
                    attributes: []
                }
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
            if(!recetaBD){
                throw Error(`El UUID: ${ID} no existe`)

            }else{
                const diets = recetaBD.dietTypes.map(d => d.name)
                return {...recetaBD.toJSON(), dietTypes:diets}
            }           
    }else{
        const recetaAPI = await getApiInfoById(ID)
        return recetaAPI
    }
}


module.exports = getDetailByID