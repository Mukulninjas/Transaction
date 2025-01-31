import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Transction = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        transactionType: '',
        amount: '',
        description: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            description: formData.description,
            amount: formData.amount
        }
        if (formData.transactionType == "debit") {
            payload.isDebit = true;
        }
        if (formData.transactionType == "credit") {
            payload.isCredit = true;
        }

        try {
            const response = await fetch('http://localhost:8000/api/transaction', {
                method: "POST", body: JSON.stringify(payload), headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
            return;
        }

        navigate("/");
    }

    const handleReset = (e) => {
        e.preventDefault();
        setFormData({
            transactionType: '',
            amount: '',
            description: '',
        });
        navigate("/");
    }

    return (
        <div className="transactionContainer">
            <h3>New Transaction</h3>
            {/* <div>
                <button onClick={() => navigate("/")}>Back to transactions</button>
            </div> */}
            <div className="formContainer">
                <div>
                    <label htmlFor="transactionType">Transaction Type:</label>
                    <select id="transactionType" name="transactionType" required onChange={handleChange}>
                        <option value="">Select Type</option>
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="amount">Amount:</label>
                    <input type="number" id="amount" name="amount" onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" name="description" onChange={handleChange} />
                </div>
                <div className="buttonBlock">
                    <div>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>
                    <div>
                        <button onClick={handleReset}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transction