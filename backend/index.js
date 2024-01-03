const express = require('express')

const app = express();

app.use(express.json());
const port = 8080;

app.get('/',(req,res)=>{
    res.send('app is started');
})

app.listen(port,()=>{
    console.log(`app is listioning on port : ${port}`);
})