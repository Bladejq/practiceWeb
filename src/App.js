import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import StudentAlbum from "./pages/StudentAlbum";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<Layout><Home /></Layout>}
        />
        <Route
          path="/about"
          element={<Layout><AboutUs /></Layout>}
        />
        <Route
          path="/student/:id"
          element={<Layout><StudentAlbum /></Layout>}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
