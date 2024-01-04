const {Router} = require('express');
const {tokenValidator} = require('../middlewares/jwtValidator')
const {expenseZod} = require('../inputValidate/expense')
const {createExpense,getAllExpense} = require('../controllers/expense')

const router = Router();

router.get('/',(req,res)=>{
    res.send("hello from expenseTracer")
})

router.post('/expense',tokenValidator,async(req,res)=>{
    const userInput = req.body;
    try{
        const inputValidate = expenseZod.safeParse(userInput);
        if(!inputValidate.success){
            res.status(411).json('input is not valid');
        }
        userInput.userEmail = req.data.email;
        const newExpense = await createExpense(userInput);
        res.send(newExpense);
    }
    catch(error){
        res.status(401).json({message:error});
    }
})

router.get('/expense',tokenValidator,async(req,res)=>{
    try{
        userEmail = req.data.email;
        const allExpense = await getAllExpense({userEmail:userEmail});
        res.send(allExpense);
    }
    catch(error){
        res.status(401).json({message:error})
    }
})

module.exports = router;