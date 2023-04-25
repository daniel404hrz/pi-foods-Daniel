const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {

    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    summary: {
      type: DataTypes.STRING,
      allowNull:false,
    },

    spoonacularScore: {
      type: DataTypes.INTEGER, 
    },

    healthScore: {
      type: DataTypes.INTEGER,
    },

    steps: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: true
    },

    image:{
      type:DataTypes.STRING
    },
    bdRecipe:{
      type:DataTypes.BOOLEAN,
      defaultValue:true,
    }
    

  });
}
