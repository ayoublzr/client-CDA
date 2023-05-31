import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Product.css";
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categorie, setCategory] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3003/api/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        return axios.get(
          `http://localhost:3003/api/categorie/${res.data.CategorieId}`
        );
      })
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="product-container">
        <div className="product-image">
          <img
            src={"http://localhost:3003/assets/uploads/" + product.image}
            alt={product.image}
          />
        </div>
        <div className="productInfo">
          <h2 className="product-name">{product.name}</h2>
          <div className="product-details">
            <p className="categorie-name">
              Catégorie: {categorie ? categorie.name : "Loading..."}
            </p>
            <p className="product-description">
              Description :{product.description}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
