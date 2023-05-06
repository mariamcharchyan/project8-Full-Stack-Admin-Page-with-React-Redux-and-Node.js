const express = require('express');
const Sequelize = require('sequelize');
const app = express();
app.use(express.json())
const cors = require('cors');
app.use(cors());
const {User} = require('./models/users_schema')
const {Product} = require('./models/products_schema')
const {Category} = require('./models/category_schema')
const products_routes = require('./routes/products_routes')
const users_routes = require('./routes/users_routes')
const categories_routes = require('./routes/categories_routes')
const mail_rout = require('./routes/mail_rout')

User.sync()
    .then(() => console.log('User table created successfully'))
    .catch((err) => console.log('Error creating user table:', err));

Category.sync()
    .then(() => console.log('Category table created successfully'))
    .catch((err) => console.log('Error creating category table:', err));

Product.sync()
    .then(() => console.log('Product table created successfully'))
    .catch((err) => console.log('Error creating product table:', err));

Product.belongsTo(Category, { foreignKey: 'categories_id' });

products_routes.get_products_route(app);
products_routes.get_product_id_route(app);
products_routes.post_product_route(app);
products_routes.delete_product_route(app);
products_routes.put_product_id(app);

users_routes.register_user_route(app);
users_routes.login_user_route(app);
users_routes.get_user_route(app);

categories_routes.get_categories_route(app);
categories_routes.add_category_route(app);
categories_routes.delete_category_route(app);
categories_routes.put_category_id_route(app);

mail_rout.get_verify_user_route(app);

app.listen(3000);

