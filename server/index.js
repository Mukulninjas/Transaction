const express = require('express');
const cors = require('cors');
const router = require('./router/transactionrouter');
const connectDb = require('./config/connectDb');

const app = express();
app.use(cors());
app.use(express.json());

connectDb(); // Connect to MongoDB database

app.use('/api', router);

app.get('/',(req, res)=>{
    res.json({"message": "Server is running"});
})

app.listen(8000, ()=>{
    console.log("Server listening on port 8000");
})