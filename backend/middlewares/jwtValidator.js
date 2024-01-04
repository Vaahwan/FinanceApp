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

const verifyToken = (token)=>{
    const decoded = jwt.verify(token,jwtpassword);
    return decoded;
}

const tokenValidator = (req,res,next)=>{
    const isExist = req.headers.hasOwnProperty("authorization");
    if(!isExist){
        res.send('token not found');
    }
    const [type,token] = req.headers.authorization.split(" ");
    const decoded = verifyToken(token);
    
    if(decoded.error){
        res.status(401).send('invalid token');
    }

    if(decoded.name){
        req.data = decoded;
        next();
    }
    else{
        res.status(403).send('not authenticated')
    }
    
}

module.exports = {createToken,tokenValidator}