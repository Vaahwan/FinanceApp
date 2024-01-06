const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const includedSchema = new Schema({
    name:{
        type: String,
        require : true
    },
    email:{
        type: String,
        require : true
    },
    owes:{
        type: Number,
        require: true
    }
})

const personSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    }
})

const groupExpenseSchema = new Schema({
    date:{
        type: String,
        require: true
    },
    month:{
        type: Number,
        require: true
    },
    year:{
        type: Number,
        require: true
    },
    expense:{
        type: Number,
        require: true
    },
    description:{
        type: String,
        require: true
    }, 
    expenseType:{
        type: String,
        require: true
    },
    groupId:{
        type: String,
        require: true
    },
    postBy:{
        type: personSchema,
        require: true
    },
    paidBy:{
        type: personSchema,
        require: true
    },
    included:{
        type : [includedSchema],
        require : true
    },
})

module.exports = mongoose.model("GroupExpense",groupExpenseSchema);