const express = require('express');
const {Router} = require('express');
const User = require('../models/User');
const {signupUser,loginUser,getUser} = require('../controllers/account')
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
            res.status(411).send({message:"input is not valid"});
        }
        else{
            userInput.friends = [];
            userInput.groups = [];
            const response = await signupUser(userInput)
            res.send(response);
        }
    }
    catch(error){
        res.status(401).json({message : error});
    }
})

router.post('/login',async(req,res)=>{
    const userInput = req.body;
    try{
        const inputValidate = signupZod.safeParse(userInput);
        if(!inputValidate.success){
            res.status(411).send('input is not valid');
        }
        else{
            const response = await loginUser(userInput);
            res.send(response)
        }
    }
    catch(error){
        res.status(401).json({message:error});
    }
})

router.post('/token',tokenValidator,async(req,res)=>{
    const loggedInUser = await getUser(req.data);
    res.send(loggedInUser);
})

module.exports = router;
