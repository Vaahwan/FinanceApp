const zod = require('zod');

const expenseZod = zod.object({
    date : zod.string(),
    month : zod.number(),
    year : zod.number(),
    expense : zod.number(),
    expenseType : zod.string()
})

module.exports = {expenseZod}