const express=require('express');
const router=express.Router();

const {body}=require("express-validator");
const userController=require('../controllers/user.controller')

const authMiddleware=require('../middlewares/auth.middleware')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('at least 3 character'),
    body('password').isLength({min:6}).withMessage('pASSWORD at least 6')
],userController.registerUser)


router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Invalid Password')
],userController.loginUser)


router.get('/profile',authMiddleware.authUser,userController.getUserProfile);
router.get('/logout',authMiddleware.authUser,userController.logoutUser);











module.exports=router;