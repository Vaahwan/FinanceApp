const {Router} = require('express');

const router = Router();

router.get('/',(req,res)=>{
    res.send("hello from expenseTracer")
})

module.exports = router;