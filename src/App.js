import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import "bootstrap/dist/css/bootstrap.css";
import Products from "./Pages/Products/Products";



import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Devis from "./Pages/Devis/Devis";
import ActivationPage from "./Pages/ActivationPage/ActivationPage";
import NewPassword from "./components/resetPassword/newPassword";
import ResetPassword from "./components/resetPassword/resetPassword";
import Product from "./Pages/Product/Product";

function App() {

  return (
   
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/devis" element={<Devis />} />
      <Route path="/confirm/:activationcode" element={<ActivationPage/>} />
      <Route path="/newpassword/:activationcode" element={<NewPassword/>} />
      <Route path="/resetpassword" element={<ResetPassword/>} />
      <Route path="/product/:id" element={<Product/>} />
    </Routes>
  );
}

export default App;
