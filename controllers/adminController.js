const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring')


const securePassword = async(password)=>{
    try{
        const passwordHash = await bcrypt.hash(password,10);
        return passwordHash;

    }
    catch(error){
        console.log(error.message);
        

    }
}
//admin log-in route handler
const loadLogin = async(req,res)=>{
    try{
        res.render('login')

    }
    catch(error){
        console.log(error.message);
        
    }
}

//admin verify handler -(matching- details)
const verifyLogin = async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password

        const userData = await User.findOne({email:email});
        if(userData){
            const passwordMatch = await bcrypt.compare(password,userData.password);

            if(passwordMatch){

                if(userData.is_admin === 0){
                    res.render('login',{message:"Email and password is incorrect"});
                }
                else{
                    // is successfull
                    req.session.user_id = userData._id;
                    res.redirect('/admin/home');

                }
            }
            else{
                res.render('login',{message:'Email and password is incorrect'});
            }

        }
        else{
            res.render('login',{message:'Email or Password incorrect'})

        }
    }
    catch(error){
        console.log(error.message);
        
    }
}

//admin log success dashboard handler
const loadDashboard = async(req,res)=>{
    try{
       const userData = await User.findById({_id:req.session.user_id});
        res.render('home',{admin:userData});
    }
    catch(error){
        console.log(error.message);
        

    }
}
// admin logout handler

const logout = async(req,res)=>{
    try{
        req.session.destroy();
        res.redirect('/admin');

    }
    catch(error){
        console.log(error.message);
        
    }
}
//dashboard route Handler
const adminDashboard = async(req,res)=>{
    try{
        //fetching all users data from DB
        const usersData = await User.find({is_admin:0})

        res.render('dashboard',{users:usersData});

    }
    catch(error){
        console.log(error.message);
        
    }

}
//Add new user handler
const newUserLoad = async (req,res)=>{
    try{
        res.render('new-user');

    }
    catch(error){
        console.log(error.message);
        
    }
}
//new User post
const addUser = async(req,res)=>{
    try{
        const name = req.body.name;
        const email = req.body.email;
        const mno = req.body.mno;
        const password = randomstring.generate(8);

        const spassword = await securePassword(password);

        const user = new User({
            name:name,
            email:email,
            mobile:mno,
            password:spassword,
            is_admin:0
        });

        const userData = await user.save()
        if(userData){
            res.redirect('/admin/dashboard')

        }
        else{
            res.render('new-user',{message:'Something wrong..!'})

        }


    }
    catch(error){
        console.log(error.message);
        
    }
}
// edit User Handler
const editUserLoad = async(req,res)=>{
    try{
        const id = req.query.id;
       const userData= await User.findById({_id:id});
       if(userData){
        res.render('edit-user',{user:userData});

       }
       else{
        res.redirect('/admin/dashboard')
       }
             

    } 
    catch(error){
        console.log(error.message);
        
    }
}
// user edit post Handler
const updateUsers = async(req,res)=>{
    try{
    const userData = await User.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mno}});
        res.redirect('/admin/dashboard')

    }
    catch(error){
        console.log(error.message);
        
    }
}
// delete User get Handler
const deleteUser = async(req,res)=>{
    try{
        const id = req.query.id;
       await User.deleteOne({_id:id});
        res.redirect('/admin/dashboard');

    }
    catch(error){
        console.log(error.message);
        
    }
}
// search user
const searchUser = async (req, res) => {  
    try {
        const query = req.query.query || '';
        const users = await User.find({
            $or: [
                { name: { $regex: `^${query}`, $options: 'i' } },
                { email: { $regex: `^${query}`, $options: 'i' } }
            ]
        });

        res.render('dashboard', { users });
    } catch (error) {
        console.log(error.message);
        
    }
};


module.exports = {
    loadLogin,
    verifyLogin,
    loadDashboard,
    logout,
    adminDashboard,
    newUserLoad,
    addUser,
    editUserLoad,
    updateUsers,
    deleteUser,
    searchUser
}