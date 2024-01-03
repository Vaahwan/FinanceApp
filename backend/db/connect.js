//mongodb+srv://vaahwan:vaahwan@cluster0.xxaleu8.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://vaahwan:vaahwan@cluster0.xxaleu8.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://vaahwan:aahwan786@cluster0.kjhpl0m.mongodb.net/user_app

const mongoose = require('mongoose')
const url = 'mongodb+srv://vaahwan:vaahwan@cluster0.xxaleu8.mongodb.net/expense'
const url2 = 'mongodb+srv://vaahwan:aahwan786@cluster0.kjhpl0m.mongodb.net/user_app'


const connect = async()=>{
    try{
        const connection = await mongoose.connect(url);
        console.log('database connected');
    }
    catch(error){
        console.log(error);
    }
}


module.exports = connect;