import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import "bootstrap/dist/css/bootstrap.css";
import Products from "./Pages/Products/Products";


import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Devis from "./Pages/Devis/Devis";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/devis" element={<Devis />} />
    </Routes>
  );
}

export default App;
