const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const peopleSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    }
})

const groupSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    people:{
        type: [peopleSchema],  // array of object with structure defined in peopleSchema
        require : true
    },  
})

module.exports = mongoose.model("Group",groupSchema);