const express = require('express')
const expenseTracerRoute = require('./routes/expenseTracker.route');
const accountRoute = require('./routes/account.route');
const groupExpenseRoute = require('./routes/groupExpense.route')
const connect = require('./db/connect')

const app = express();

app.use(express.json());
const port = 8080;
app.use('/expensetracker',expenseTracerRoute);
app.use('/account',accountRoute);
app.use('/groupexpense',groupExpenseRoute);

connect();

app.get('/',(req,res)=>{
    res.send('app is started');
})

app.listen(port,()=>{
    console.log(`app is listioning on port : ${port}`);
})