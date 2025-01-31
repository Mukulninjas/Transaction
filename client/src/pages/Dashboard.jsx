import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    const fetchTransactions = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/transaction');
            const data = await response.json();
            setTransactions(data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div>
            <h3>Transactions</h3>
            <div className='buttonContainer'>
                <button onClick={() => navigate("/transaction")}>Add Transaction</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Credit</th>
                        <th>Debit</th>
                        <th>Running Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.createdAt}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.isCredit ? transaction.amount : ""}</td>
                            <td>{transaction.isDebit ? transaction.amount : ""}</td>
                            <td>{transaction.runningBalance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard