const Sequelize = require('sequelize');
// const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const users = [
    { name: "Mariam", surename: "Charchyan", age: 27, gender: "female", email: "mariam@mail.com", is_verified: 1, status: "admin", password: "Mariam27", image: "https://pm1.narvii.com/7642/a92afc1a2929921ff6c90e8d034b2fd24e04d52er1-2048-2048v2_00.jpg" },
    { name: "Hasmik", surename: "Nalbandyan", age: 22, gender: "female", email: "hasmik@mail.com", is_verified: 1, status: "user", password: "Hasmik22", image: "https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile11.png" },
    { name: "Narek", surename: "Mkrtchyan", age: 33, gender: "male", email: "narek@mail.com", is_verified: 1, status: "user", password: "Narek33", image: "https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile-02-768x768.png" },
    { name: "Aram", surename: "Hayrapetyan", age: 44, gender: "male", email: "aram@mail.com", is_verified: 1, status: "user", password: "Aram33", image: "https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile-01.png" }
];
const categories = [
    { name: "For girl" },
    { name: "For boy" },
    { name: "For all" }
];

const products = [
    { image: 'https://rukminim1.flixcart.com/image/416/416/jepzrm80/learning-toy/h/e/m/toyk-kids-toys-musical-colorful-baby-fun-house-many-kinds-of-original-imaf3cjsyyzdzfuq.jpeg?q=70', categories_id: 3, name: 'Musical Toy', price: 50, discount_percentage: 30, quantity: 1, description: 'A best selling favorite with thousands of 5 star ratings. Inspires a lifelong love of music. Baby can switch between 10 total melodies'},
    { image: 'https://dpi399zi9oi5i.cloudfront.net/wp-content/uploads/2021/06/15174742/WhatsApp-Image-2021-06-14-at-1.52.21-PM.jpeg', categories_id: 1, name: 'Mini kitchen', price: 100, discount_percentage: 20, quantity: 2, description: 'Mini kitchen. There is a saucepan and a frying pan to prepare the tastiest imaginative menus. There is even a small sink, two spatulas and the essentials for any meal: salt and pepper shakers. This cute little kitchen is foldable for easy portability and to pack all accessories inside.'},
    { image: 'https://m.media-amazon.com/images/I/61tplXbeaLL._AC_SY355_.jpg', categories_id: 3, name: 'Maze', price: 20, discount_percentage: 30, quantity: 4, description: 'The pull labyrinth develops motor skills, coordination, sensory skills, logic and thinking.'},
    { image: 'https://cdn.shopify.com/s/files/1/0088/7986/5907/products/Viga-Magnetic-Shapes-Blocks-Set-Construction-Viga-Toys-Toycra-4_700x700.jpg?v=1653495389', categories_id: 3, name: 'Maze and logic box', price: 40, discount_percentage: 30, quantity: 5, description: 'The pull labyrinth develops motor skills, coordination, sensory skills, logic and thinking. By moving the small figures along the entire length of the wire, the child trains the muscles of the hand and the celerity of fingers'},
    { image: 'https://m.media-amazon.com/images/I/61rkkggbFLL.jpg', categories_id: 2, name: 'A rocket', price: 30, discount_percentage: 30, quantity: 1, description: 'The fully equipped, 2-in-1 set includes a detachable top capsule and two astronauts that sport molded spacesuits, helmets, and dual-tank backpacks. Powered by a main booster and three auxiliary fin boosters, the Rocket has a large door that flips down to double as a set of steps up into the main cavity, while the detachable nose cone capsule has its own door that opens to reveal buttons, dials, and of course, the signature Green Toys 8-track.'},
    { image: 'https://ae01.alicdn.com/kf/Hc5ba085f9e2542ac824cc1192f06e8d7h.jpg', categories_id: 2, name: 'Excavator', price: 30, discount_percentage: 25, quantity: 3, description: 'Tonka Excavator is made of cold-rolled steel and features colorful and realistic detail.Features a movable arm with a heavy-duty metal bucket to dig and haul. Real working treads allow you to maneuver through any job site in style'},
    { image: 'https://m.media-amazon.com/images/I/71auvSc8ClL._AC_SL1500_.jpg', categories_id: 1, name: 'Mini kitchen', price: 100, discount_percentage: 70, quantity: 0, description: 'Mini kitchen. There is a saucepan and a frying pan to prepare the tastiest imaginative menus. There is even a small sink, two spatulas and the essentials for any meal: salt and pepper shakers. This cute little kitchen is foldable for easy portability and to pack all accessories inside.'},
    { image: 'https://rukminim1.flixcart.com/image/612/612/k4lmv0w0/musical-toy/q/y/b/wooden-xylophone-musical-toy-for-children-with-8-note-big-size-original-imafng8zzagmjdrp.jpeg?q=70', categories_id: 3, name: 'Xylophone', price: 50, discount_percentage: 30, quantity: 10, description: 'Wooden xylophone colorful musical instrument toy children educational toys with drumsticks for kids'},
    { image: 'https://m.media-amazon.com/images/I/71YBUL+hxLL._AC_UF894,1000_QL80_.jpg', categories_id: 3, name: 'Wooden Log Cabin Set Building House Toy', price: 30, discount_percentage: 50, quantity: 8, description: 'A timeless retro toy for kids and adults alike, these traditional building logs have just the right mix of modern durability and classic style. Childhood memories are waiting to be archived with these amazing wood logs'}
];

const sequelize = new Sequelize('mydb',null,null,
    {dialect:'sqlite', storage:'../database.db'});


const User = sequelize.define('user', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
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
    quantity: {
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
