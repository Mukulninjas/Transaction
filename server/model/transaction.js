const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({ 
    description : {
        type: String
    },
    isCredit : {
        type: Boolean,
        required: true
    },
    isDebit: {
        type: Boolean,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    runningBalance: {
        type: Number,
        required: true,
        default: 0
    }        
}, {timestamps: true});

module.exports = mongoose.model('Transaction', transactionSchema);