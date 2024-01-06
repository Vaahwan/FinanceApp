const GroupExpense = require('../models/groupExpense');

const createExpense = async(input)=>{
    const date = input.date;
    const month = input.month;
    const year = input.year;
    const expense = input.expense;
    const description = input.description;
    const expenseType = input.expenseType;
    const groupId = input.groupId;
    const postBy = input.postBy;
    const paidBy = input.paidBy;
    const included = input.included;

    const newExpense = await GroupExpense.create({
        date : date,
        month : month,
        year : year,
        expense : expense,
        description : description,
        expenseType : expenseType,
        groupId : groupId,
        postBy : postBy,
        paidBy : paidBy,
        included : included
    })

    return newExpense;
}

const getAllExpense = async(groupId)=>{
    const allExpense = await GroupExpense.find({groupId:groupId});
    return allExpense;
}

const getSpecificExpense = async(id)=>{
    const specificExpense = await GroupExpense.findById(id);
    return specificExpense
}

const updateExpense = async(id,input)=>{
    const updatedExpense = await GroupExpense.findOneAndReplace({_id:id},input,{new:true,returnOriginal: false})
    return updatedExpense
}

const deleteExpense = async(id)=>{
    const deletedExpense = await GroupExpense.findByIdAndDelete(id);
    return deletedExpense;
}

module.exports = {createExpense,getAllExpense,getSpecificExpense,updateExpense,deleteExpense};