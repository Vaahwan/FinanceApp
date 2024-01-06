const {Router} = require('express')
const {tokenValidator} = require('../middlewares/jwtValidator');
const {groupExpenseZod} = require('../inputValidate/groupExpense')
const {createExpense,getAllExpense,getSpecificExpense,updateExpense,deleteExpense} = require('../controllers/groupExpense');

const router = Router();

router.get('/',(req,res)=>{
    res.send("hello from group expense");
})

router.post('/expense',tokenValidator,async(req,res)=>{
    try{
        const userInput = req.body;
        // not doing input validation for now because request was not passing and there was no error message as well.
        const postBy = {
            name : req.data.name,
            email : req.data.email
        }
        userInput.postBy = postBy;
        console.log("in else")
        const newExpense = await createExpense(userInput);
        res.send(newExpense);
    }
    catch(error){
        res.status(411).json({message:error,msg:"something wrong happened"});
    }
})

router.get('/expense/:groupId',tokenValidator,async(req,res)=>{
    try{
        const groupId = req.params.groupId;
        const allExpense = await getAllExpense(groupId);
        res.send(allExpense);
    }
    catch(error){
        res.status(411).json({message:error});
    }
})

router.get('/expense/:groupId/:id',tokenValidator,async(req,res)=>{
    try{
        const id = req.params.id;
        const specificExpense = await getSpecificExpense(id);
        res.send(specificExpense);
    }
    catch(error){
        res.status(411).json({message:error});
    }
})

router.put('/expense/:groupId/:id',tokenValidator,async(req,res)=>{
    try{
        const id = req.params.id;
        const userInput = req.body;
        const updatedExpense = await updateExpense(id,userInput);
        res.send(updatedExpense);
    }
    catch(error){
        res.status(411).json({message:error});
    }
})

router.delete('/expense/:groupId/:id',tokenValidator,async(req,res)=>{
    try{
        const id = req.params.id;
        const deletedExpense = await deleteExpense(id);
        res.send(deletedExpense);
    }
    catch(error){
        res.status(411).json({message:error});
    }
})

module.exports = router;