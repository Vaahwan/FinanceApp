const express = require('express');
const jwt = require('jsonwebtoken');
const {Router} = require('express');
const User = require('../models/User');
const {signupUser} = require('../controllers/account')
const {signupZod} = require('../inputValidate/account')

const jwtpassword = 'vaahwan';
const router = Router();


router.get('/',(req,res)=>{
    res.send("hello from account")
})


router.post('/signup', async(req,res)=>{
    const userInput = req.body;

    try{
        const inputValidate = signupZod.safeParse(userInput)
        if(!inputValidate.success){
            res.status(411).json({message:"input is not valid"});
        }
        const response = await signupUser(userInput)
        res.send(response);
    }
    catch(error){
        res.status(401).json({message : error});
    }
})

router.post('/login',async(req,res)=>{
    const userInput = req.body;
})

module.exports = router;
