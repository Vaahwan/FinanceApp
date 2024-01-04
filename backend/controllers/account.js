const User = require('../models/User');
const bcrypt = require('bcryptjs')
const {createToken} = require('../middlewares/jwtValidator')

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
        const token = createToken({name:name,email:email})
        return token;
    }
    else{
        return "password does not match"
    }
}

module.exports = {signupUser,loginUser}