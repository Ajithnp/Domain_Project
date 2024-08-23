const express = require('express')
const user_route = express()
const path = require('path')
const session = require('express-session');

//session handling
const config = require('../config/config');
user_route.use(session({
    secret:config.sessionSecret,
    resave:false,
    saveUninitialized:true
}))


const auth = require('../middleware/auth');
//using log-in ,log-out middleware from auth.js

const mailAuth = require('../middleware/mailAuth')


user_route.set('view engine','ejs')
user_route.set('views','./views/users')

//using static files
user_route.use(express.static('public'));


const bodyParser = require('body-parser')
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}))


const userController = require('../controllers/userController');
const { adminDashboard } = require('../controllers/adminController');
// const isMail = require('../middleware/mailAuth');

user_route.get('/register',auth.isLogout,userController.loadRegister);


user_route.post('/register',mailAuth,userController.insertUser)

//login route(home)
user_route.get('/',auth.isLogout,userController.loginLoad);
user_route.get('/login',auth.isLogout,userController.loginLoad);

//login post route
user_route.post('/login',userController.verifyLogin)

// validation (True) redirect to home route
user_route.get('/home',auth.isLogin,userController.loadHome)

//logout route
user_route.get('/logout',auth.isLogin,userController.userLogout);

//Edit route
user_route.get('/edit',auth.isLogin,userController.editUser)
//edit post 
user_route.post('/edit',userController.updateProfile)



    
    




module.exports = user_route;
