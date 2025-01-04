import { useEffect, useState } from "react";
import { fetchBooks } from "../api/bookApi";  // Ensure you have this API function implemented
import Header from "../components/Header";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");  // State to handle search query

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
    filterBooks(category, searchQuery);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterBooks(selectedCategory, query);
  };

  const filterBooks = (category, query) => {
    let tempBooks = books;

    if (category !== "All") {
      tempBooks = tempBooks.filter((book) => book.category === category);
    }

    if (query) {
      tempBooks = tempBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredBooks(tempBooks);
  };

  return (
    <div className="homepage w-full mx-auto">
      <Header />
      
     
      {/* Categories Section */}
      <section className="categories py-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Categories</h2>
        <div className="grid mx-5 grid-cols-3 lg:flex justify-center gap-4">
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
      {/* Search Bar */}
      <section className="search-bar  text-center py-4 w-10/12 mx-auto">
        <input
          type="text"
          placeholder="Search books by name or author..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="input input-bordered w-full max-w-xl mx-auto"
        />
      </section>

      {/* Featured Books Section */}
      <section className="featured-books py-8 w-10/12 mx-auto bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100">
        <h2 className="text-3xl font-semibold text-center mb-6">Featured Books</h2>

        <div className="book-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book card w-full flex flex-col bg-base-100 shadow-xl p-4 rounded-lg">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-64 object-contain rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-500 mb-4">{book.author}</p>
              <p className="text-gray-600 mb-4 text-xl">{book.price} BDT</p>
              <NavLink
                to={`/book/${book.id}`}
                className="btn w-full mt-2 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-lg rounded-md text-lg font-semibold"
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
