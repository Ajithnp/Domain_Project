const express = require('express');
const admin_route = express();

//session setting
const session = require('express-session');
const config = require('../config/config');
admin_route.use(session({secret:config.sessionSecret,
    resave:false,
    saveUninitialized:true
}))


const bodyParser = require('body-parser')
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extended:true}));

// setting view engine 
admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin');

// importing middleware from (authAdmin)
const auth = require('../middleware/adminAuth')


const adminController = require('../controllers/adminController');

admin_route.get('/',auth.isLogout,adminController.loadLogin);


admin_route.post('/',adminController.verifyLogin);
// admin log succefull
admin_route.get('/home',auth.isLogin,adminController.loadDashboard);

//admin logout
admin_route.get('/logout',auth.isLogin,adminController.logout)

//dash board 
admin_route.get('/dashboard',auth.isLogin,adminController.adminDashboard);

// add new User
admin_route.get('/new-user',auth.isLogin,adminController.newUserLoad);
//new user Post
admin_route.post('/new-user',adminController.addUser)
//Update user
admin_route.get('/edit-user',auth.isLogin,adminController.editUserLoad)

admin_route.post('/edit-user',adminController.updateUsers)
//delete User
admin_route.get('/delete-user',adminController.deleteUser)
//search user
admin_route.get('/search',auth.isLogin,adminController.searchUser)
admin_route.get('*',(req,res)=>{
    res.redirect('/admin')
});

module.exports = admin_route;
