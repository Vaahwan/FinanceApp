const {Router} = require('express');
const {tokenValidator} = require('../middlewares/jwtValidator')
const {expenseZod} = require('../inputValidate/expense')
const {createExpense,getAllExpense,getSpecificExpense,updateExpense,deleteExpense} = require('../controllers/expense')

const router = Router();

router.get('/',(req,res)=>{
    res.send("hello from expenseTracer")
})

// create

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

// Read all

router.get('/expense',tokenValidator,async(req,res)=>{
    try{
        const userEmail = req.data.email;
        const allExpense = await getAllExpense({userEmail:userEmail});
        res.send(allExpense);
    }
    catch(error){
        res.status(401).json({message:error})
    }
})

// Read specific

router.get('/expense/:id',tokenValidator,async(req,res)=>{
    try{
        const id = req.params.id;
        const specificExpense = await getSpecificExpense(id);
        res.send(specificExpense)
    }   
    catch(error){
        res.status(401).json({message:error})
    }
})

// edit or update

router.put('/expense/:id',tokenValidator,async(req,res)=>{
    try{
        const id = req.params.id;
        const userEmail = req.data.email;
        const userInput = req.body;

        const inputValidate = expenseZod.safeParse(userInput);
        if(!inputValidate.success){
            res.status(411).json('input is not valid');
        }
        userInput.userEmail = userEmail;
        const updatedExpense = await updateExpense(userInput,id,userEmail);
        res.send(updatedExpense);
    }
    catch(error){
        res.status(401).json({message:error,msg:"something happen"})
    }
})

// delete

router.delete('/expense/:id',tokenValidator,async(req,res)=>{
    try{
        const id = req.params.id;
        const userEmail = req.data.email;
        const deletedExpense = await deleteExpense(id,userEmail)
        res.send(deletedExpense);
    }
    catch(error){
        res.status(401).json({message:error});
    }
})


module.exports = router;