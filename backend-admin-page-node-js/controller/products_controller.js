const {Product} = require('../models/products_schema')

function get_products(req,res){
    //Product.findAll({offset:3, limit:5})
    Product.findAll().then((prod) => {
        res.json(prod)
    }).catch((err) => {
        res.status(500).json({error: err.message})
    })
}

function get_product_id(req,res){
    if(req.params.id){
        Product.findByPk(req.params.id)
            .then((prod) => {
                if(!prod) res.status(404).json({error: 'Product not found'});
                res.json(prod);
            })
            .catch((err) => {
                res.status(500).json({error: err.message})
            })
    }
};

function post_product(req, res){
    const {image, name, price, discount_percentage, description, categories_id} = req.body;
    Product.create({image, name, price, discount_percentage, description, categories_id})
        .then((prod)=>{
            res.status(201).json({successed: "Product added successfully"})
        }).catch((err) => {
            res.status(500).json({error: err.message})
        })
};

function delete_product_id(req, res){
    Product.destroy({ where: { id: req.params.id }})
        .then((prod) => {
            if(prod === 0) {
                res.status(404).json({ error: 'Product not found' });
            } else {
                res.status(201).json({ successed: 'Product deleted' });
                // res.json({ successed: "product updated" });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        })
};

function put_product_id(req, res){
    const id = req.params.id;
    const {image, name, price, discount_percentage, description, categories_id} = req.body;
    Product.findByPk(id)
      .then((product) => {
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        product.image = image;
        product.name = name;
        product.price = price;
        product.discount_percentage = discount_percentage;
        product.description = description;
        product.categories_id = categories_id;
        product.save()
          .then(() => {
            res.json({ status: "product updated" });
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {res.status(500).json({ error: err.message });
      });
  };

module.exports = {
    get_products,
    get_product_id,
    post_product,
    delete_product_id,
    put_product_id
}
