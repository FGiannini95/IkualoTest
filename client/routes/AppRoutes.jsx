import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/dashboard/Home/Home";
import { ErrorPage } from "../pages/dashboard/Error/ErrorPage";
import { Login } from "../pages/auth/Login/Login";
import { Register } from "../pages/auth/Register/Register";
import  NavBarApp  from "../components/NavBarApp/NavBarApp";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <NavBarApp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};
