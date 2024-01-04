const Expense = require('../models/Expense');

const createExpense = async(input)=>{
    const date = input.date;
    const month = input.month;
    const year = input.year;
    const expense = input.expense;
    const expenseType = input.expenseType;

    const newExpense = await Expense.create({
        date : date,
        month : month,
        year : year,
        expense : expense,
        expenseType : expenseType
    })
    return newExpense;
}

module.exports = {createExpense}