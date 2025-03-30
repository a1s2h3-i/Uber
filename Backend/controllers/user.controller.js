const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    // Create an instance of the userModel to access the instance method
    const user = new userModel();

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
