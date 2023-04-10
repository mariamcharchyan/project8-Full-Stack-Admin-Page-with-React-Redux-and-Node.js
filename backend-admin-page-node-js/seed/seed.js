const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const users = [
    { name: "Mariam", surename: "Charchyan", age: 27, gender: "female", email: "mariam@mail.com", is_verified: 1, status: "admin", password: "Mariam27"},
    { name: "Hasmik", surename: "Nalbandyan", age: 22, gender: "female", email: "hasmik@mail.com", is_verified: 1, status: "user", password: "Hasmik22" },
    { name: "Narek", surename: "Mkrtchyan", age: 33, gender: "male", email: "narek@mail.com", is_verified: 1, status: "user", password: "Narek33" },
    { name: "Aram", surename: "Hayrapetyan", age: 44, gender: "male", email: "aram@mail.com", is_verified: 1, status: "user", password: "Aram33" }
];

const categories = [
    { name: "girl" },
    { name: "boy" },
    { name: "men" },
    { name: "women" },
    { name: "accessories" }
];

const products = [
    { image: 'https1', name: 'image1', price: 111100, discount_percentage: 30,description: 'description1', categories_id: 1},
    { image: 'https2', name: 'image2', price: 111100, discount_percentage: 30,description: 'description2', categories_id: 2},
    { image: 'https3', name: 'image3', price: 111100, discount_percentage: 30,description: 'description3', categories_id: 2},
    { image: 'https4', name: 'image4', price: 111100, discount_percentage: 30,description: 'description4', categories_id: 1},
    { image: 'https5', name: 'image5', price: 111100, discount_percentage: 30,description: 'description5', categories_id: 1},
    { image: 'https6', name: 'image6', price: 111100, discount_percentage: 30,description: 'description6', categories_id: 2},
];

const sequelize = new Sequelize('mydb',null,null,
    {dialect:'sqlite', storage:'../database.db'});


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
        }
});

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
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    }
});

Product.belongsTo(Category, { foreignKey: 'categories_id' });

async function seed() {
    try {
      await sequelize.sync({ force: true });

      const hashedUsers = users.map(user => {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(user.password, salt);
        return {...user, password: hashedPassword};
      });
  
      await User.bulkCreate(hashedUsers);

      const createdCategories = await Category.bulkCreate(categories, { returning: true });

      const productsWithCategories = products.map(product => {
        const category = createdCategories.find(cat => cat.id === product.categories_id);
        return {...product, categories_id: category.id};
      });

      await Product.bulkCreate(productsWithCategories);
  
      console.log('Seeding successful!');
    } catch (error) {
      console.error(`Seeding failed: ${error}`);
      throw error;
    }
  }

seed();
