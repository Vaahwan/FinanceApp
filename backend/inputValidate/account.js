const zod = require('zod');

const signupZod = zod.object({
    name : zod.string(),
    email : zod.string().email(),
    password : zod.string().min(8)
})

module.exports = {signupZod}