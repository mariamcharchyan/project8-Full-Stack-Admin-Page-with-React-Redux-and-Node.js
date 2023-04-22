const users_controller = require('../controller/users_controller')

function register_user_route(app){
    app.post('/register', users_controller.register_user)
}

function login_user_route(app){
    app.post('/login', users_controller.login_user)
}

function get_user_route(app){
    app.post('/user', users_controller.get_user_by_email_and_password)
}

module.exports = {
    register_user_route,
    login_user_route,
    get_user_route
}