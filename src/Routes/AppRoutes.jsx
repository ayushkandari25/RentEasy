import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import LandLordDashboard from "../Pages/Landlord/LandLordDashboard";
import TenantDashboard from "../Pages/Tenant/TenantDashboard";
import Home from "../components/Home";
import Login from "../Pages/Login";


const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {user && user.role === "tenant" ? (
        <>
          <Route path="/tenant/dashboard" element={<TenantDashboard />} />
        </>
      ) : (
          <Route path="/tenant/*" element={<Navigate to="/" />} />
      )}

      {user && user.role === "landlord" ? (
        <>
          <Route path="/landlord/dashboard" element={<LandLordDashboard />} />
        </>
      ) : (
          <Route path="/landlord/*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
