const {Router} = require('express')
const {tokenValidator} = require('../middlewares/jwtValidator');

const router = Router();

router.get('/',(req,res)=>{
    res.send("hello from group expense");
})

module.exports = router;