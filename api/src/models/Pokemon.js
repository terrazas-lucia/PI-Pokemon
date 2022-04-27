const { Sequelize, DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        "pokemon",
        {
            id: {  
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4, 
                primaryKey: true,
            },
            createdInDb: { 
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, //no se puede crear dos pokemons con el mismo nombre
            },
            life: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            strength: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            defense: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            speed: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            height: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            },
            weight: {
                type: DataTypes.FLOAT,
                defaultValue: 0,
            },
            img: {
                type: DataTypes.STRING(1000), //tienen mas de 250 caracteres
                validate: {
                    isURL: true,
                },
            },
        },
        {
            timestamps: false,
            freezeTableName: true 
        }
    );
};