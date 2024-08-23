const User = require('../models/userModel');

const isMail = async (req, res, next) => {
    try {
        const mail = req.body.email;
        const existMail = await User.findOne({ email: mail });

        if (existMail) {
            return res.render('registration', { message1: 'Email already exists..!' });
        }

        
        next();
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports = isMail;
