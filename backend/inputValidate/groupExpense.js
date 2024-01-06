const zod = require('zod');

const groupExpenseZod = zod.object({
    date : zod.string(),
    month : zod.number(),
    year : zod.number(),
    expense : zod.number(),
    description : zod.string(),
    expenseType : zod.string(),
    groupId : zod.string(),
    postBy : zod.object({
        name : zod.string(),
        email : zod.string()
    }),
    paidBy : zod.object({
        name : zod.string(),
        email : zod.string()
    }),
    included : zod.array()
})

module.exports = {groupExpenseZod}