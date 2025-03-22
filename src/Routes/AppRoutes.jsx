import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import LandLordDashboard from "../Pages/Landlord/LandLordDashboard";
import TenantDashboard from "../Pages/Tenant/TenantDashboard";
import Home from "../components/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import TenantProfile from "../Pages/Tenant/TenantProfile";
import TenantRequest from "../Pages/Tenant/TenantRequest";
import LandLordProperties from "../Pages/Landlord/LandLordProperties";
import LandLordRequest from "../Pages/Landlord/LandLordRequest";
import TenantMessage from "../Pages/Tenant/TenantMessage";
import LandLordPayment from "../Pages/Landlord/LandLordPayment";
import TenantRent from "../Pages/Tenant/TenantRent";
import AvailableProperties from "../Pages/Tenant/AvailableProperties";



const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      {user && user.role === "tenant" ? (
        <>
          <Route path="/tenant/dashboard" element={<TenantDashboard />} />
          <Route path="/tenant/profile/:id" element={<TenantProfile />} />
          <Route path="/tenant/request" element={<TenantRequest />} />
          <Route path="/tenant/messages/:id" element={<TenantMessage />} />
          <Route path="/tenant/payment/:tenantId" element={<TenantRent />} />
          <Route path="/tenant/properties" element={<AvailableProperties />} />
        </>
      ) : (
        <Route path="/tenant/*" element={<Navigate to="/" />} />
      )}

      {user && user.role === "landlord" ? (
        <>
          <Route path="/landlord/dashboard" element={<LandLordDashboard />} />
          <Route path="/landlord/properties" element={<LandLordProperties />} />
          <Route path="/landlord/request" element={<LandLordRequest />} />
          <Route path="/landlord/payment" element={<LandLordPayment />} />
        </>
      ) : (
        <Route path="/landlord/*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
};

export default AppRoutes;
