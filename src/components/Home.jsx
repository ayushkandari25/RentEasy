import React from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div
      className="relative w-full h-screen flex items-center justify-center text-center px-6"
      style={{
        backgroundImage: "url('/home-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 bg-transparent backdrop-blur-lg p-10 md:p-16 rounded-2xl text-white max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in tracking-wide">
          Welcome to <span className="text-blue-400">Rent Easy</span>
        </h1>
        <p className="text-lg md:text-2xl font-light mb-8 leading-relaxed animate-slide-in">
          Find your dream home or the perfect tenant. <br /> Seamless rental
          experiences await you.
        </p>

        {/* Call-to-Action Button */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-blue-500/50 transition-transform transform hover:scale-110 duration-300"
          onClick={handleLogin}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
