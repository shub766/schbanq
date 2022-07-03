const express = require('express');
const router = express.Router();
const Users = require('../models/users');

router.post('/register', async(req,res) => {
    try{
        const { name,email,password,role } = req.body;

        //create user

        const user = await Users.create({name,email,password,role});

        //create token 

        const token = user.getSignedJWTTOken();

        res.status(200).json({ success:true, token });

    }catch(err){
        res.send('Error'+err);
    }
});

router.post('/login', async(req,res) => {
    try{
        const { email,password } = req.body;

        //validate email and password

        if (!email || !password) {
            res.send('please provide email and password');
        }

        //check for user

        const user = await Users.findOne({ email }).select('+password');

        if (!user) {
            res.send('Invalid credentials');
        };

        //check if password matches

        const ismatch = await user.matchPassword(password);

        if (!ismatch) {
            res.send('Invalid credentials');
        };


        //create token 

        const token = user.getSignedJWTTOken();

        res.status(200).json({ success:true, token });

    }catch(err){
        res.send('Error'+err);
    }
});

module.exports = router;