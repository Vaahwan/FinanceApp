const zod = require('zod');

const netwealthZod = zod.object({
    date : zod.string(),
    saving : zod.number(),
    demat : zod.number(),
    stock : zod.number(),
})

module.exports = {netwealthZod}