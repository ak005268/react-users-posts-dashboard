import React from "react";
import { Routes, Route } from "react-router-dom";
import UsersList from "../pages/UsersList";
import UserDetail from "../pages/UserDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="/user/:id" element={<UserDetail />} />
    </Routes>
  );
};

export default AppRoutes;
