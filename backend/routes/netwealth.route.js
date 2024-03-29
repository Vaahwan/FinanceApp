const {Router} = require('express');
const {tokenValidator} = require('../middlewares/jwtValidator')
const {netwealthZod} = require('../inputValidate/netwealth') 
const {createNetwealth,getAllNetwealth,updateNetwelath,deleteNetwealth} = require('../controllers/netwealth')

const router = Router();

router.get('/',(req,res)=>{
    res.send("hello from netwealth")
})

// create

router.post('/netwealth',tokenValidator,async(req,res)=>{
    try{
        const userEmail = req.data.email;
        const userInput = req.body;
        const inputValidate = netwealthZod.safeParse(userInput);
        if(!inputValidate.success){
            res.status(411).send('input is not valid');
        }
        else{
            userInput.userEmail = userEmail;
            const newNetwealth = await createNetwealth(userInput);
            res.send(newNetwealth);
        }
    }
    catch(error){
        res.status(401).json({message:error})
    }
})

// read

router.get('/netwealth',tokenValidator,async(req,res)=>{
    try{
        const userEmail = req.data.email;
        const allNetwealth = await getAllNetwealth({userEmail:userEmail});
        res.send(allNetwealth)
    }
    catch(error){
        res.status(401).json({message:error})
    }
})

// update

router.put('/netwealth/:id',tokenValidator,async(req,res)=>{
    try{
        const id = req.params.id;
        const userEmail = req.data.email;
        const userInput = req.body;

        const inputValidate = netwealthZod.safeParse(userInput);
        if(!inputValidate.success){
            res.status(411).send('input is not valid');
        }
        else{
            userInput.userEmail = userEmail;
            const updatedNetwealth = await updateNetwelath(userInput,id,userEmail);
            res.send(updatedNetwealth);
        }
    }
    catch(error){
        res.status(401).json({message:error});
    }
})

// delete

router.delete('/netwealth/:id',tokenValidator,async(req,res)=>{
    try{
        const id = req.params.id;
        const userEmail = req.data.email;
        const deletedNetwealth = await deleteNetwealth(id,userEmail)
        res.send(deletedNetwealth);
    }
    catch(error){
        res.status(401).json({message:error});
    }
})



module.exports = router;