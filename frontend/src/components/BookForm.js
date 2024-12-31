import React, { useState, useEffect } from 'react';
import { getAuthors, getCategories } from '../services/api';

function BookForm({ book, onSubmit }) {
    const [title, setTitle] = useState(book ? book.title : '');
    const [authorId, setAuthorId] = useState(book ? book.author.author_id : '');
    const [categoryId, setCategoryId] = useState(book ? book.category.category_id : '');
    const [isbn, setIsbn] = useState(book ? book.isbn : '');
    const [publicationYear, setPublicationYear] = useState(book ? book.publication_year : '');
    const [copiesAvailable, setCopiesAvailable] = useState(book ? book.copies_available : 1);
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAuthors();
        fetchCategories();
    }, []);

    const fetchAuthors = async () => {
        try {
            const response = await getAuthors();
            setAuthors(response.data);
        } catch (error) {
            console.error('Error fetching authors:', error);
            setError('Failed to load authors.');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to load categories.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookData = {
            title: title,
            author_id: authorId,
            category_id: categoryId,
            isbn: isbn,
            publication_year: publicationYear,
            copies_available: copiesAvailable,
        };
        if (book) {
            onSubmit(book.book_id, bookData);
        } else {
            onSubmit(bookData);
        }
        // Optionally reset form fields
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{book ? 'Edit Book' : 'Add Book'}</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div>
                <label>Author:</label>
                <select value={authorId} onChange={(e) => setAuthorId(e.target.value)} required>
                    <option value="">Select Author</option>
                    {authors.map(author => (
                        <option key={author.author_id} value={author.author_id}>{author.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Category:</label>
                <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
                    <option value="">Select Category</option>
                    {categories.map(category => (
                        <option key={category.category_id} value={category.category_id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>ISBN:</label>
                <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
            </div>
            <div>
                <label>Publication Year:</label>
                <input type="number" value={publicationYear} onChange={(e) => setPublicationYear(e.target.value)} required />
            </div>
            <div>
                <label>Copies Available:</label>
                <input type="number" value={copiesAvailable} onChange={(e) => setCopiesAvailable(e.target.value)} required min="1" />
            </div>
            <button type="submit">{book ? 'Update' : 'Add'}</button>
        </form>
    );
}

export default BookForm;
