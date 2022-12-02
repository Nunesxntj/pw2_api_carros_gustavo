const Sequelize = require('sequelize');

const connection = require('../database/database');

const modelCarro = connection.define(
    'tbl_carros',
    {
        cod_carro:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        nome_carro:{
            type: Sequelize.STRING(200),
            allowNull: false
        },
        modelo_carro:{
            type: Sequelize.STRING(100),
            allowNull: false
        }
    }
);

// modelCarro.sync({force:true});
module.exports = modelCarro;