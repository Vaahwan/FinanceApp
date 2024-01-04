const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const ExpenseSchema = new Schema({
    date : {
        type : String,
        required : true
    },
    month : {
        type : Number,
        required : true
    },
    year : {
        type : Number,
        required : true
    },
    expense : {
        type : Number,
        required : true
    },
    expenseType : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Expense',ExpenseSchema);