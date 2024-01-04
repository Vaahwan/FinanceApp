const jwt = require('jsonwebtoken')
const jwtpassword = 'vaahwan';

const createToken = (input)=>{
    const name = input.name;
    const email = input.email;
    const token = jwt.sign({
        name : name,
        email : email
    },jwtpassword)
    return token;
}

module.exports = {createToken}