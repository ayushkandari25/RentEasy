import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-[rgb(223,228,235)] shadow-md py-4 px-6 md:px-12 flex justify-between items-center">
      {/* Logo */}
      <Link to="/">
        <img
          src="/NavbarLogo.jpg"
          alt="RentEasy Logo"
          className="h-12 w-auto md:h-16"
        />
      </Link>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm md:text-base hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm md:text-base hover:bg-blue-700 transition duration-300"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
