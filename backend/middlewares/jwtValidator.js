const jwt = require('jsonwebtoken')
const jwtpassword = 'vaahwan';

const createToken = (input)=>{
    const email = input.email;
    const password = input.password;
    return jwt.sign({
        email : email,
        password : password
    },jwtpassword)
}

module.exports = {createToken}