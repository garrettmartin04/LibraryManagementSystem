import React, { useState, useEffect } from 'react';
import { getLoans, createLoan, updateLoan, deleteLoan } from '../services/api';

function Loans() {
    const [loans, setLoans] = useState([]);
    const [formData, setFormData] = useState({
        book_id: '',
        member_id: '',
        loan_date: '',
        due_date: '',
        return_date: '',
    });

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        const response = await getLoans();
        setLoans(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.id) {
            await updateLoan(formData.id, formData);
        } else {
            await createLoan(formData);
        }
        setFormData({
            book_id: '',
            member_id: '',
            loan_date: '',
            due_date: '',
            return_date: '',
        });
        fetchLoans();
    };

    const handleDelete = async (id) => {
        await deleteLoan(id);
        fetchLoans();
    };

    return (
        <div>
            <h2>Book Loans</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Book ID"
                    value={formData.book_id}
                    onChange={(e) => setFormData({ ...formData, book_id: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Member ID"
                    value={formData.member_id}
                    onChange={(e) => setFormData({ ...formData, member_id: e.target.value })}
                    required
                />
                <input
                    type="date"
                    placeholder="Loan Date"
                    value={formData.loan_date}
                    onChange={(e) => setFormData({ ...formData, loan_date: e.target.value })}
                    required
                />
                <input
                    type="date"
                    placeholder="Due Date"
                    value={formData.due_date}
                    onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                />
                <input
                    type="date"
                    placeholder="Return Date"
                    value={formData.return_date}
                    onChange={(e) => setFormData({ ...formData, return_date: e.target.value })}
                />
                <button type="submit">{formData.id ? 'Update' : 'Add'} Loan</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Book ID</th>
                        <th>Member ID</th>
                        <th>Loan Date</th>
                        <th>Due Date</th>
                        <th>Return Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr key={loan.loan_id}>
                            <td>{loan.book_id}</td>
                            <td>{loan.member_id}</td>
                            <td>{loan.loan_date}</td>
                            <td>{loan.due_date}</td>
                            <td>{loan.return_date}</td>
                            <td>
                                <button onClick={() => setFormData(loan)}>Edit</button>
                                <button onClick={() => handleDelete(loan.loan_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Loans;