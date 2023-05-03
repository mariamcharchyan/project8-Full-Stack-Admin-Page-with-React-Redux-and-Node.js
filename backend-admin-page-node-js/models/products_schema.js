const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb',null,null,
    {dialect:'sqlite', storage:'database.db'});

    const Product = sequelize.define('product', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        discount_percentage: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true
        }
    });

module.exports = {Product};