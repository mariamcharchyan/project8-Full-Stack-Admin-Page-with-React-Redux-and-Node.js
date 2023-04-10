const express = require('express');
const Sequelize = require('sequelize');
const app = express();
app.use(express.json())
const {User} = require('./models/users_schema')
const {Product} = require('./models/products_schema')
const {Category} = require('./models/category_schema')

// const sequelize = new Sequelize('mydb',null,null,
//     {dialect:'sqlite', storage:'database.db'});
//տվյալների բազայու user, category և product 
User.sync()
    .then(() => console.log('User table created successfully'))
    .catch((err) => console.log('Error creating user table:', err));

Product.belongsTo(Category, { foreignKey: 'categories_id' });

Category.sync()
    .then(() => console.log('Category table created successfully'))
    .catch((err) => console.log('Error creating category table:', err));

Product.sync()
    .then(() => console.log('Product table created successfully'))
    .catch((err) => console.log('Error creating product table:', err));



// app.get('/products',(req,res) => {
//     //Product.findAll({offset:3, limit:5})
//     Product.findAll().then((prod) => {
//         res.json(prod)
//     }).catch((err) => {
//         res.status(500).json({error: err.message})
//     })
// })

// app.get('/products/:id',(req,res) => {
//     if(req.params.id){
//         Product.findByPk(req.params.id)
//             .then((prod) => {
//                 if(!prod) res.status(404).json({error: 'Product not found'});
//                 res.json(prod);
//             })
//             .catch((err) => {
//                 res.status(500).json({error: err.message})
//             })
//     }
// })

// app.post('/products',(req,res) => {
//     const {name, price} = req.body;
//     Product.create({name, price}).then((prod)=>{
//         res.status(201).json(prod)
//     }).catch((err) => {
//         res.status(500).json({error: err.message})
//     })
// })

// app.delete('/products/:id', (req, res) => {
//     Product.destroy({ where: { id: req.params.id }})
//         .then((prod) => {
//             if(prod === 0) {
//                 res.status(404).json({ error: 'Product not found' });
//             } else {
//                 // res.status(204).end('Product deleted');
//                 res.json({ status: "product updated" });
//             }
//         })
//         .catch((err) => {
//             res.status(500).json({ error: err.message });
//         })
// });
    
// app.put('/products/:id', (req, res) => {
//     const id = req.params.id;
//     const { name, price } = req.body;
  
//     Product.findByPk(id)
//       .then((product) => {
//         if (!product) {
//           return res.status(404).json({ error: 'Product not found' });
//         }
//         product.name = name;
//         product.price = price;
//         product.save()
//           .then(() => {
//             res.json({ status: "product updated" });
//           })
//           .catch((err) => {
//             res.status(500).json({ error: err.message });
//           });
//       })
//       .catch((err) => {res.status(500).json({ error: err.message });
//       });
//   });

app.listen(3003)