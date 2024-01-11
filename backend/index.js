const express = require('express')
const expenseTracerRoute = require('./routes/expenseTracker.route');
const accountRoute = require('./routes/account.route');
const groupExpenseRoute = require('./routes/groupExpense.route')
const netwealth = require('./routes/netwealth.route')
const connect = require('./db/connect')
const cors = require('cors')

const app = express();

app.use(express.json());
const port = 8080;
app.use(cors());
app.use('/expensetracker',expenseTracerRoute);
app.use('/account',accountRoute);
app.use('/groupexpense',groupExpenseRoute);
app.use('/netwealthtracker',netwealth);

connect();

app.get('/',(req,res)=>{
    res.send('app is started');
})

app.listen(port,()=>{
    console.log(`app is listioning on port : ${port}`);
})