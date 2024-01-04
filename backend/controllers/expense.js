const Expense = require('../models/Expense');

const createExpense = async(input)=>{
    const date = input.date;
    const month = input.month;
    const year = input.year;
    const expense = input.expense;
    const expenseType = input.expenseType;
    const userEmail = input.userEmail

    const newExpense = await Expense.create({
        date : date,
        month : month,
        year : year,
        expense : expense,
        expenseType : expenseType,
        userEmail : userEmail
    })
    return newExpense;
}

const getAllExpense = async(input)=>{
    const allExpense = await Expense.find({userEmail:input.userEmail})
    return allExpense;
}

module.exports = {createExpense,getAllExpense}