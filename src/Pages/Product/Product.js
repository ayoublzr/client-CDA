import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Product.css";
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/Footer/Footer";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [categorie, setCategory] = useState(null);
  const URL= process.env.REACT_APP_URL
  useEffect(() => {
    axios
      .get(`${URL}/api/product/${id}`)
      .then((res) => {
        setProduct(res.data);
        return axios.get(`${URL}/api/categorie/${res.data.CategorieId}`);
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
            src={`${URL}/assets/uploads/` + product.image}
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
    <h2 className style={{display: "flex", flexDirection: "column", alignItems: "center", color: "gold" , fontFamily:"fantasy",marginTop:"3rem"}}>Video d'application</h2>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" ,marginTop:"3rem",marginBottom:"5rem"}}>
    <iframe
    
      width="560"
      height="315"
      src={product.video}
      title="YouTube Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
      <Footer />
    </div>
  );
}
