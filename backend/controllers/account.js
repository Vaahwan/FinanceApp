const User = require('../models/User');
const bcrypt = require('bcryptjs')

const signupUser = async(input)=>{
    const name = input.name;
    const email = input.email;
    const password = input.password;
    const doesUserExist = await User.findOne({email:email});
    if(doesUserExist){
        return "user already exist";
    }

    const salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    //bcrypt.compareSync("not_bacon", hash);
    
    await User.create({
        name : name,
        email : email,
        password : hash
    })

    return "user created successfully"   
}


const loginUser = async(input)=>{
    const name = input.name;
    const email = input.email;
    const password = input.password;
    
    const signedInUser = await User.findOne({email:email});
    if(!signedInUser){
        return 'user does not exist';
    }
    const passwordCheck = bcrypt.compareSync(password,signedInUser.password);
    if(passwordCheck){
        return `hello ${name}`
    }
    else{
        return "password does not match"
    }
}

module.exports = {signupUser,loginUser}