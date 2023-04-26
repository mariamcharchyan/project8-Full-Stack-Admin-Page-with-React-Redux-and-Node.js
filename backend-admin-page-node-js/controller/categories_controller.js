const {Category} = require('../models/category_schema')

function get_categories(req,res){
    Category.findAll().then((categories) => {
        res.json(categories)
    }).catch((err) => {
        res.status(500).json({error: err.message})
    })
}

function add_category(req, res) {
    const { name } = req.body;
  
    Category.create({ name })
      .then((category) => {
        res.status(201).json({ id: category.id, name: category.name });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }

function delete_category_id(req, res) {
    const categoryId = req.params.id;

    Category.destroy({
      where: { id: categoryId } 
    })
      .then((rowsDeleted) => {
        if (rowsDeleted === 0) {
          res.status(404).json({ error: 'Category not found' });
        } else {
          res.status(204).send({success:'Categoryis successfully deleted'});
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }

  function put_category_id(req, res){
    const id = req.params.id;
    const { name } = req.body;
    Category.findByPk(id)
      .then((category) => {
        if (!category) {
          return res.status(404).json({ error: 'Category not found' });
        }
        category.name = name;
        category.save()
          .then(() => {
            res.json({ status: "Category updated" });
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      })
      .catch((err) => {res.status(500).json({ error: err.message });
      });
  };

module.exports = {
    get_categories,
    add_category,
    delete_category_id,
    put_category_id
}
