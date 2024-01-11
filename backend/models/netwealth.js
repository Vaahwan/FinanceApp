const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const NetwealthSchema = new Schema({
    date:{
        type: String,
        require: true
    },
    saving:{
        type: Number,
        require: true
    },
    demat:{
        type: Number,
        require: true
    },
    stock:{
        type: Number,
        require: true
    },
    total:{
        type: Number,
        require: true
    },
    userEmail : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Netwealth",NetwealthSchema);