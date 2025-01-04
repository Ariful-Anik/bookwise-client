import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/books';

// Fetch all books
export const fetchBooks = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// Fetch a single book by ID
export const fetchBookById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Fetch book recommendations based on book ID
export const fetchRecommendations = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}/recommendations`);
  return response.data;
};
