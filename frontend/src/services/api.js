import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_URL,
});

export const getPopularBooks = () => api.get('popular_books/');

// Authors API
export const getAuthors = () => api.get('authors/');
export const createAuthor = (author) => api.post('authors/', author);
export const updateAuthor = (id, author) => api.put(`authors/${id}/`, author);
export const deleteAuthor = (id) => api.delete(`authors/${id}/`);

// Categories API
export const getCategories = () => api.get('categories/');
export const createCategory = (category) => api.post('categories/', category);
export const updateCategory = (id, category) => api.put(`categories/${id}/`, category);
export const deleteCategory = (id) => api.delete(`categories/${id}/`);

// Books API
export const getBooks = () => api.get('books/');
export const createBook = (book) => api.post('books/', book);
export const updateBook = (id, book) => api.put(`books/${id}/`, book);
export const deleteBook = (id) => api.delete(`books/${id}/`);

// Members API
export const getMembers = () => api.get('members/');
export const createMember = (member) => api.post('members/', member);
export const updateMember = (id, member) => api.put(`members/${id}/`, member);
export const deleteMember = (id) => api.delete(`members/${id}/`);

// Loans API
export const getLoans = () => api.get('loans/');
export const createLoan = (loan) => api.post('loans/', loan);
export const updateLoan = (id, loan) => api.put(`loans/${id}/`, loan);
export const deleteLoan = (id) => api.delete(`loans/${id}/`);

export default api;
