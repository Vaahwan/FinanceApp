const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const friendsSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    owes:{
        type: Number,
        require: true
    }
})

const UserSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    friends:{
        type: [friendsSchema],
        require: true
    },
    groups:{
        type: Array,
        require: true
    }
})

module.exports = mongoose.model("User",UserSchema);