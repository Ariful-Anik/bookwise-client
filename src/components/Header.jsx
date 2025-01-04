import React from "react";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
      <header className=" w-11/12 mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="logo text-3xl font-extrabold flex items-center space-x-2">
          <NavLink to='/'><span className="material-icons text-4xl">BookWise</span></NavLink>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <a
            href="/"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Home
          </a>
          <a
            href="/"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Categories
          </a>
          <a
            href="/"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Cart
          </a>
          <a
            href="/"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            Account
          </a>
        </nav>

        {/* Mobile Menu */}
        <div className="dropdown md:hidden dropdown-left">
          <label tabIndex={0} className="btn btn-ghost text-white">
            <span className="material-icons text-3xl">
              <FaBars />
            </span>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-gradient-to-r from-indigo-500 to-pink-500 rounded-box w-32"
          >
            <li>
              <a
                href="/"
                className="text-white hover:bg-white hover:text-indigo-500 rounded p-2"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/categories"
                className="text-white hover:bg-white hover:text-purple-500 rounded p-2"
              >
                Categories
              </a>
            </li>
            <li>
              <a
                href="/cart"
                className="text-white hover:bg-white hover:text-pink-500 rounded p-2"
              >
                Cart
              </a>
            </li>
            <li>
              <a
                href="/account"
                className="text-white hover:bg-white hover:text-red-500 rounded p-2"
              >
                Account
              </a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
