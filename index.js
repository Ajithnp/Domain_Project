const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/user_management_system');
mongoose.connect('mongodb://127.0.0.1:27017/user_management_system')
   .then(() => console.log('Database connected'))
   .catch(err => console.log('Database connection error:', err));


const express = require('express')
const app = express()


//for user routes
const userRoute = require('./routes/userRoute')
app.use('/',userRoute);

//for admin routes

const adminRoute = require('./routes/adminRoute')
app.use('/admin',adminRoute);



app.listen(3001,()=> console.log('server is running on http://localhost:3001'))