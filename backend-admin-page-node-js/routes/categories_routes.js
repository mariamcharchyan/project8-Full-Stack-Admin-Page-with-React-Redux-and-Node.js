const categories_controller = require('../controller/categories_controller')
const jwt_authentication = require('../jwt/jwt_authentication')
const jwt_authorization = require('../jwt/jwt_authorization')

function get_categories_route(app){
    app.get('/categories',
    jwt_authentication.authenticateToken,
    jwt_authorization.checkStatusAdmin,
    categories_controller.get_categories)
}

function add_category_route(app){
    app.post('/category/new',
    jwt_authentication.authenticateToken,
    jwt_authorization.checkStatusAdmin,
    categories_controller.add_category)
}

function delete_category_route(app){
    app.delete('/category/delete/:id',
    jwt_authentication.authenticateToken,
    jwt_authorization.checkStatusAdmin,
    categories_controller.delete_category_id)
}

function put_category_id_route(app){
    app.put('/category/update/:id',
    jwt_authentication.authenticateToken,
    jwt_authorization.checkStatusAdmin,
    categories_controller.put_category_id)
}

module.exports = {
    get_categories_route,
    add_category_route,
    delete_category_route,
    put_category_id_route
}