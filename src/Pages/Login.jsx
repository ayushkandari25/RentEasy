import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = await login(email, password);
      if (role === "tenant") {
        navigate("/tenant/dashboard");
      } else if (role === "landlord") {
        navigate("/landlord/dashboard");
      }
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <form onSubmit={handelSubmit}>
      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
