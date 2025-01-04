import { useEffect, useState } from "react";
import { fetchBooks } from "../api/bookApi";  // Ensure you have this API function implemented
import Header from "../components/Header";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const getBooks = async () => {
      const data = await fetchBooks();
      setBooks(data);
      setFilteredBooks(data); // Initially show all books
    };
    getBooks();
  }, []);

  const categories = ["All", "Fiction", "Non-Fiction", "Fantasy", "Science"];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredBooks(books); // Show all books
    } else {
      setFilteredBooks(books.filter((book) => book.category === category)); // Filter books by selected category
    }
  };

  return (
    <div className="homepage w-11/12 mx-auto">
      <Header />
      
      {/* Categories Section */}
      <section className="categories py-8 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-6">Categories</h2>
        <div className="flex justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn btn-outline ${selectedCategory === category ? "btn-primary" : "btn-secondary"} text-lg`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="featured-books py-8 container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">Featured Books</h2>

        <div className="mb-6 text-center">
          {/* Dropdown for category selection */}
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="select select-bordered w-56 mx-auto"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="book-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book card w-full justify-between flex bg-base-100 shadow-xl p-4 rounded-lg">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-56 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-500 mb-4">{book.author}</p>
              <p className="text-gray-600 mb-4 text-xl">{book.price} $</p>
              <NavLink
                to={`/book/${book.id}`}
                className="btn btn-primary text-white w-full mt-2"
              >
                Book Details
              </NavLink>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
