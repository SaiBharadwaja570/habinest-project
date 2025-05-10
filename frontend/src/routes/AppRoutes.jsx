import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import OwnerPgForm from "../pages/OwnerPgForm";
import ProfilePage from "../pages/ProfilePage";
import PGListPage from "../pages/PGListPage";
import FilterListingPage from "../pages/FilterListingPage";
import BookmarkedPGsPage from "../pages/BookmarkedPGsPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/owner-form" element={<OwnerPgForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pg-list" element={<PGListPage />} />
        <Route path="/filter" element={<FilterListingPage />} />
        <Route path="/bookmarks" element={<BookmarkedPGsPage />} />
      </Routes>
  );
}

export default App;
