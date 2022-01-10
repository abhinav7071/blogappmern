const {body,validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();//Include config file

/****Token****/
const createtoken = (user) => {
    return jwt.sign({user},'mystrongjwtkey',{expiresIn:'7d'});
}


/****isme validation rule define krenge****/
module.exports.registerValidations = [
    body("name").not().isEmpty().trim().withMessage("Name is required"),
    body("email").not().isEmpty().trim().withMessage("Email is required"),
    body("password").isLength({min:6}).withMessage("Password must be of 6 characters")
];
/****Register API****/
module.exports.register = async (req,res) => {
    const {name,email,password} = req.body;
    const errors = validationResult(req);

    /****check validation error****/
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() });
    } 

    /****User Register****/
    try{
        const checkUser = await User.findOne({email});
        /*****checck validation*****/
        if(checkUser){
            return res.status(400).json({errors:[{msg:'Email already taken'}] });
        }
        /*****hash password****/
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        /***user registration****/
        try{
            const user = await User.create({
                name : name,
                email: email,
                password : hash,
            });
        /****token****/
            const token = jwt.sign({user},'mystrongjwtkey',{expiresIn:'7d'});
            return res.status(200).json({msg:'Account created successfully',token});
        } catch(error){
            res.status(402).json({errors : error});
        }

    } catch(error){
        res.status(400).json({errors : error});
    }
    
}


/****isme login validation rule define krenge****/
module.exports.loginValidations = [
    body("email").not().isEmpty().trim().withMessage("Email is required"),
    body("password").not().isEmpty().trim().withMessage("Password is required")
];
/****Login API****/
module.exports.login = async (req,res) => {
    const {email,password} = req.body;
    const errors = validationResult(req);

    /****check validation error****/
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() });
    }
    /****Login****/
    try{
        const user = await User.findOne({email});
        if(user){
            /****Compare bcrypt****/
            const matched = await bcrypt.compare(password,user.password);
            if(matched){
                //generate token by call tokeb function
                const token = createtoken(user);
                return res.status(200).json({msg:'Login successfully',token});
            } else{
                return res.status(401).json({errors:[{msg:'Password is not correcct'}] });
            }
        } else {
            return res.status(404).json({errors:[{msg:'Email not found'}] });
        }
    } catch(error){
        res.status(500).json({errors : error});
    }
}