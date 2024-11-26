const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Company = sequelize.define('Company', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
    ,
    companyName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    }
    

});

module.exports = Company;