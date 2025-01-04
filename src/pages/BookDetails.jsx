import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { fetchBookById, fetchRecommendations } from '../api/bookApi'; // Import API methods
import Header from '../components/Header';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      const data = await fetchBookById(id);
      setBook(data);
    };

    const getRecommendations = async () => {
      const data = await fetchRecommendations(id);
      setRecommendations(data);
    };

    getBook();
    getRecommendations();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-details bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100 w-full mx-auto min-h-screen">
      <Header />
      
      <div className="book-header bg-white shadow-lg rounded-lg p-8 mx-auto max-w-screen-lg mt-8 flex flex-col md:flex-row gap-8">
        <img
          src={book.coverImage}
          alt={book.title}
          className="book-cover w-full md:w-72 h-auto rounded-lg object-cover shadow-md"
        />
        
        <div className="book-info flex flex-col justify-center md:w-1/2">
          <h1 className="text-4xl font-extrabold text-indigo-600 mb-2">{book.title}</h1>
          <h3 className="text-xl text-gray-700 mb-4">by {book.author}</h3>
          <p className="text-lg text-gray-900 mb-4">Price: <span className="font-semibold">${book.price}</span></p>

          <div className="flex gap-4 mb-4">
            <button className="btn btn-primary w-full md:w-auto bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg shadow-md">Add to Cart</button>
            <button className="btn btn-outline w-full md:w-auto bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-100 rounded-lg shadow-md">Add to Wishlist</button>
          </div>

          <p className="text-gray-600 text-sm mt-4">Free shipping on orders over $50!</p>
        </div>
      </div>

      <section className="book-description bg-white shadow-lg rounded-lg p-8 mt-8 mx-auto max-w-screen-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
        <p className="text-lg text-gray-700">{book.description}</p>
      </section>

      <section className="recommendations bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 py-8 mt-8">
        <div className="max-w-screen-lg mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Bought Together</h2>

          <div className="recommendation-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendations.map(recBook => (
              <div key={recBook.id} className="recommendation card w-full bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow">
                <NavLink to={`/book/${recBook.id}`}>
                  <img
                    src={recBook.coverImage}
                    alt={recBook.title}
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                  <div className="card-body p-4">
                    <h4 className="text-lg font-semibold text-gray-800 truncate">{recBook.title}</h4>
                  </div>
                </NavLink>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookDetails;
