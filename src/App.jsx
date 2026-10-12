import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import "./index.css";
import Hero from "./pages/Hero";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="compctainer">
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
