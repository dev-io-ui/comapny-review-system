const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Review = sequelize.define('review', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
    ,
    pros: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      cons: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    

});

module.exports = Review;