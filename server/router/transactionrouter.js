const express = require('express');
const Transaction = require('../model/transaction')

const router = express.Router();

router.get('/transaction', async(req, res) => {
    try {
        const transactions = await Transaction.find().sort({createdAt: -1});
        res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.post('/transaction', async (req, res) => {
    const { isCredit=false, isDebit=false, description, amount } = req.body;

    if(!amount) {
        return res.status(400).json({ message: "Invalid transaction data" });
    }
    
    try {
        const transactions = await Transaction.find().sort({createdAt: -1});
        let runningBalance = transactions[0]?.runningBalance || 0;
        runningBalance = Number(runningBalance);
        if(isCredit){
            runningBalance += Number(amount);
        }else if(isDebit) {
            if(runningBalance <= amount){
                return res.status(400).json({ message: "Insufficient Funds !!!"})
            }
            runningBalance -= Number(amount);
        }else{
            return res.status(400).json({ message: "Invalid transaction type" });
        }
        const transaction = new Transaction({
            isCredit,
            isDebit,
            description,
            amount,
            runningBalance
        });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

module.exports = router;