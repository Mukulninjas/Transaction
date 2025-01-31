const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const res = await mongoose.connect("mongodb://localhost:27017/transaction");
        console.log("Connected to MongoDB...");
    } catch (error) {
        console.log(error.message);
    } 
}

module.exports = connectDb;