import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-[rgb(223,228,235)] shadow-md py-4 px-6 md:px-12 flex justify-between items-center">
      <Link to="/">
        <img
          src="/NavbarLogo.jpg"
          alt="RentEasy Logo"
          className="h-12 w-auto md:h-16"
        />
      </Link>

      <div className="flex gap-4">
        {user ? (
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm md:text-base hover:bg-red-700 transition duration-300"
            onClick={() => {
              logout();
              navigate("/login"); // Redirect to login page after logout
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm md:text-base hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm md:text-base hover:bg-blue-700 transition duration-300"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
