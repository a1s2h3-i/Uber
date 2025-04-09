const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel=require('../models/blackListToken.model');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;
   

    // Create an instance of the userModel to access the instance method
    const user = new userModel();
    const isUserAlready=await user.findOne({email});
    if(isUserAlready){
        return res.status(400).json({message:'User already exist'});
    }

    // Hash the password using the instance method
    const hashedPassword = await user.hashPassword(password);

    // Create a new user using the hashed password
    const newUser = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    // Generate JWT token for the new user
    const token = newUser.generateAuthToken();

    res.status(201).json({ token, user: newUser });
};

module.exports.loginUser=async(req,res,next)=>{
    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password}=req.body;
    //const user = new userModel();

    const user=await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message:'invalid email or password'});
    }

    const isMatch=await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message:"invalid email or password"})
    }
    const token=user.generateAuthToken();
    res.cookie('token',token);

    res.status(200).json({token,user})

}


module.exports.getUserProfile=async(req,res,next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser=async(req,res,next)=>{
    res.clearCookie('token');
    const token=req.cookies.token||req.headers.authorization.split(' ')[ 1 ]
    await blacklistTokenModel.create({token});
    res.status(200).json({message:"logged out"});
}

