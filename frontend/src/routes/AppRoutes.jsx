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
import SinglePg from "../pages/SinglePg";
import Map from "../components/Map";
import UpdatePgPage from "../pages/UpdatePgPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<SinglePg />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/owner-form" element={<OwnerPgForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/pg-list" element={<PGListPage />} />
        <Route path="/filter" element={<FilterListingPage />} />
        <Route path="/bookmarks" element={<BookmarkedPGsPage />} />
        <Route path="/map" element={<Map />} />
        <Route path="/update-pg/:id" element={<UpdatePgPage />} />
      </Routes>
  );
}

export default App;
