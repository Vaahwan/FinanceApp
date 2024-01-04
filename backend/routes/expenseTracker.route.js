const {Router} = require('express');
const {tokenValidator} = require('../middlewares/jwtValidator')
const {expenseZod} = require('../inputValidate/expense')
const {createExpense} = require('../controllers/expense')

const router = Router();

router.get('/',(req,res)=>{
    res.send("hello from expenseTracer")
})

router.post('/expense',tokenValidator,(req,res)=>{
    const userInput = req.body;
    try{
        const inputValidate = expenseZod.safeParse(userInput);
        if(!inputValidate.success){
            res.status(411).json('input is not valid');
        }
        const newExpense = createExpense(userInput);
        res.send(newExpense);
    }
    catch(error){
        res.status(401).json({message:error});
    }
})

module.exports = router;