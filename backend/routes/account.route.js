const express = require('express')
const {Router} = require('express')
const User = require('../models/User');

const router = Router();

router.get('/',(req,res)=>{
    res.send("hello from account")
})

router.post('/signup', async(req,res)=>{
    const username = req.body.username;
    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;
    await User.create({
        name : username,
        email : useremail,
        password : userpassword
    })
    res.json({
        message : 'user created successfully'
    })
})

module.exports = router;
