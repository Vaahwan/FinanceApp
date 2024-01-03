const express = require('express')
const expenseTracerRoute = require('./routes/expenseTracker.route');
const accountRoute = require('./routes/account.route');
const connect = require('./db/connect')

const app = express();

app.use(express.json());
const port = 8080;
app.use('/expensetracer',expenseTracerRoute)
app.use('/account',accountRoute)

connect();

app.get('/',(req,res)=>{
    res.send('app is started');
})

app.listen(port,()=>{
    console.log(`app is listioning on port : ${port}`);
})