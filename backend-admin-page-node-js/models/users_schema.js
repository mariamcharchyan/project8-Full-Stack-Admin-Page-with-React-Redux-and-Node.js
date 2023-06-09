    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    
    const Sequelize = require('sequelize');

    //const sequelize = new Sequelize('mydb', 'username', 'password', {
    const sequelize = new Sequelize('mydb', null, null, {
      dialect: 'sqlite',
      storage: 'database.db'
    });
    
    const User = sequelize.define('user', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      surename: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      status: {
        type: Sequelize.ENUM('admin', 'user'),
        defaultValue: 'user'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING,
        defaultValue: 'https://t3.ftcdn.net/jpg/05/87/76/66/240_F_587766653_PkBNyGx7mQh9l1XXPtCAq1lBgOsLl6xH.jpg'
      }
    }, {
      // hooks: {
      //   beforeCreate: async (user) => {
      //     const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      //     user.password = hashedPassword;
      //   }
      // }
    });
    
    module.exports = { User };