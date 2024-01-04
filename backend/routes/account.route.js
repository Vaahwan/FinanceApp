const express = require('express');
const {Router} = require('express');
const User = require('../models/User');
const {signupUser,loginUser} = require('../controllers/account')
const {signupZod} = require('../inputValidate/account')
const {loginValidator, tokenValidator} = require('../middlewares/jwtValidator')

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
    const response = await loginUser(userInput);
    res.send(response)
})

router.post('/token',tokenValidator,(req,res)=>{
    res.send("middleware checked");
})

module.exports = router;
