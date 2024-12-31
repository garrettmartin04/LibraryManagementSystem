import React, { useState, useEffect } from 'react';
import { getBooks, createBook, updateBook, deleteBook } from '../services/api';
import BookForm from '../components/BookForm';

function Books() {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await getBooks();
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
            setError('Failed to fetch books.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddBook = async (book) => {
        try {
            await createBook(book);
            fetchBooks();
        } catch (error) {
            console.error('Error creating book:', error);
            setError('Failed to create book.');
        }
    };

    const handleEditBook = (book) => {
        setEditingBook(book);
    };

    const handleUpdateBook = async (id, updatedBook) => {
        try {
            await updateBook(id, updatedBook);
            setEditingBook(null);
            fetchBooks();
        } catch (error) {
            console.error('Error updating book:', error);
            setError('Failed to update book.');
        }
    };

    const handleDeleteBook = async (id) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        try {
            await deleteBook(id);
            fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
            setError('Failed to delete book.');
        }
    };

    if (loading) return <p>Loading books...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h2>Books</h2>
            <BookForm onSubmit={handleAddBook} />
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>ISBN</th>
                        <th>Publication Year</th>
                        <th>Copies Available</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length === 0 ? (
                        <tr>
                            <td colSpan="7">No books available.</td>
                        </tr>
                    ) : (
                        books.map(book => (
                            <tr key={book.book_id}>
                                <td>{book.title}</td>
                                <td>{book.author.name}</td>
                                <td>{book.category.name}</td>
                                <td>{book.isbn}</td>
                                <td>{book.publication_year}</td>
                                <td>{book.copies_available}</td>
                                <td>
                                    <button onClick={() => handleEditBook(book)}>Edit</button>
                                    <button onClick={() => handleDeleteBook(book.book_id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {editingBook && <BookForm book={editingBook} onSubmit={handleUpdateBook} />}
        </div>
    );
}

export default Books;
