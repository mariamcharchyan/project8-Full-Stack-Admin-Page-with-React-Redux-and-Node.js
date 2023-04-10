const Sequelize = require('sequelize');

const sequelize = new Sequelize('mydb',null,null,
    {dialect:'sqlite', storage:'database.db'});

const Category = sequelize.define('category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = {Category};