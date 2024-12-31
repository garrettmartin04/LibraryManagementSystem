import React, { useEffect, useState } from 'react';
import api from '../services/api';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('books/');
        setBooks(response.data);
      } catch (err) {
        if (err.response) {
          // Server responded with a status other than 2xx
          setError(`Error: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {
          // Request was made but no response received
          setError('Error: No response received from the server.');
        } else {
          // Something else happened
          setError(`Error: ${err.message}`);
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Books List</h1>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.book_id}>
              <strong>{book.title}</strong> by {book.author.name} - {book.category.name} - {book.publication_year}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BooksList;