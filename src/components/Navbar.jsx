import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Home from './Home';
// import Login from '../Pages/Login';

const Navbar = () => {
  // const navigate=useNavigate();

  // const handelLogin=()=>{
  //   navigate("/Pages/Login")
  // } 
  return (
    <>
      <div>
        <Link to="/">
          <img src="/NavbarLogo.jpg" alt="RentEasylogo" />
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </>
  );
}

export default Navbar