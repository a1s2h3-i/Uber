const express=require('express');
const router=express.Router();

const captainController=require('../controllers/captain.controller')
const {body}=require("express-validator");

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('at least 3 character'),
    body('password').isLength({min:6}).withMessage('at least 3 character'),
    body('vehicle.color').isLength({min:3}).withMessage('at least 3 character'),
    body('vehicle.plate').isLength({min:3}).withMessage('at least 3 character'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid character')
    
    
    


],captainController.registerCaptain)





module.exports=router;