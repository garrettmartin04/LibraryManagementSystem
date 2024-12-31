import React, { useState, useEffect } from 'react';
import { getPopularBooks } from '../services/api';

function PopularBooks() {
    const [popularBooks, setPopularBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPopularBooks();
    }, []);

    const fetchPopularBooks = async () => {
        try {
            const response = await getPopularBooks();
            setPopularBooks(response.data);
        } catch (err) {
            console.error('Error fetching popular books:', err);
            setError('Failed to load popular books.');
        }
    };

    return (
        <div>
            <h3>Popular Books</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {popularBooks.length === 0 ? (
                    <li>No popular books available.</li>
                ) : (
                    popularBooks.map((book) => (
                        <li key={book.book_id}>
                            <strong>{book.title}</strong> - {book.popularity_score} loans
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default PopularBooks;