const User = require('../models/userModel');
const bcrypt = require('bcrypt');

//hashing password
const securePassword = async (password)=>{

    try{
        const passwordHash =await bcrypt.hash(password,10);
        return passwordHash;
    } catch(error){
        console.log(error.message);
        

    }
}
//render the registration form
const loadRegister = async(req,res)=>{
    try{
        
        res.render('registration');

    }catch(error){
        console.log();
        

    }
    
}
//schema defining 
const insertUser = async(req,res)=>{

    try {
        const spassword = await securePassword(req.body.password);
        const user = new User({
            
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mno,
            password:spassword,
            is_admin:0
            


        });
      
        const userData = await user.save();//to save the User to mongoDB
        console.log('User to be saved:', userData);

        if(userData){
            res.render('registration',{message:'registration successfully..!'})
        }else{
            res.render('registration',{message:'Your registration has been failed.'})
        }
        
    } catch (error) {
        console.log('error',error.message);
        
        
    }
}

//login user methods started

const loginLoad = async(req,res)=>{
    try{
        res.render('login')
    }
    catch(error){
        console.log(error.message);
        
    }

}

//login post request handler
const verifyLogin = async(req,res)=>{
    //checking datas from DB and Matching
    try{
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email:email});

        if(userData){
            const passwordMatch = await bcrypt.compare(password,userData.password);
            if(passwordMatch){
                //session setting
                req.session.user_id = userData._id;
                res.redirect('/home')
            }
            else{
                res.render('login',{message:'Email or Password Incorrect'})
            }

        }
        else{
            res.render('login',{message:'Invalid Credentials'})
        }
    }
    catch(error){
        console.log(error.message);
        
    }
}
// get home route handler
const loadHome = async(req,res)=>{
    try{
        //findById is a mongoose method that retrives a document from the mongoDb colllection by its unique id
        const userData=await User.findById({ _id:req.session.user_id})
        res.render('home',{user:userData});
    }
    catch(error){
        console.log(error.message);        
    }
}

//userLogout handler
const userLogout = async(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/');
        
    } catch (error) {
        console.log(error.message);
        
        
    }

}
// user edit get handler

const editUser = async(req,res)=>{
    try{
        const id = req.query.id;
        const userData = await User.findById({_id:id})
        if(userData){
            res.render('edit',{user:userData});

        }
        else{
            res.redirect('/home')

        }
        

    }
    catch(error){
        console.log(error.message);
        
    }
}
// user edit post handler
const updateProfile = async(req,res)=>{
    try{
    
      const userData = await User.findByIdAndUpdate({_id:req.body.id},{$set:{name:req.body.name, email:req.body.email, mobile:req.body.mno}})
      res.redirect('/home')

        

    }
    catch(error){
        console.log(error.message);
        
    }
} 


module.exports = {
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
    editUser,
    updateProfile
   

}