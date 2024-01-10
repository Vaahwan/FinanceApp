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

const getPageExpense = async(input)=>{
    let {page,size,sort} = input;
    if(!page){
        page = 1;
    }
    if(!size){
        size = 1;
    }
    const limit = parseInt(size)
    const skip = (page-1)*limit;
    const pageExpense = await Expense.find({userEmail:input.userEmail}).skip(skip).limit(limit);
    return pageExpense;
}

const getSpecificExpense = async(id)=>{
    const specificExpense = await Expense.findById(id);
    return specificExpense;
}

const updateExpense = async(input,id,email)=>{
    try{
        const expense = await Expense.findById(id);
        if(expense.userEmail!=email){
            return "unauthorised to edit this expense"
        }
        const updatedExpense = await Expense.findOneAndReplace({_id:id},input,{new:true,returnOriginal: false});
        return updatedExpense;
        }
    catch(error){
        return error;
    }
}

const deleteExpense = async(id,email)=>{
    try{
        const expense = await Expense.findById(id);
        if(expense.userEmail!=email){
            return "unauthorised to delete this expense";
        }
        const deletedExpense = await Expense.findByIdAndDelete(id);
        return deletedExpense;
    }
    catch(error){
        return error;
    }
}

module.exports = {createExpense,getAllExpense,getSpecificExpense,updateExpense,deleteExpense,getPageExpense}