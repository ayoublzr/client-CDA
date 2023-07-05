import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import "./styleCard.css";
import { Form } from "react-bootstrap";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const URL= process.env.REACT_APP_URL
  useEffect(() => {
    axios
      .get(`${URL}/api/products`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${URL}/api/categories`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(`${URL}/api/products/categorie/${selectedCategory}`)
        .then((res) => {
          console.log(res.data);
          setFilteredProducts(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <Form>
        <Form.Group id="selectCategorie" className="mb-3">
          <Form.Label style={{ color: "white" }}>Sélectionné une catégorie </Form.Label>
          <Form.Select onChange={handleCategoryChange} value={selectedCategory}>
            <option value="">Toutes les catégories</option>
            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>

      <div id="cards" className="container">
        <div className="row">
          {filteredProducts.length === 0 ? (
            <p style={{ color: "white" }}>Aucun produit trouvé !</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4">
                <div
                  className="product-item"
                  style={{ backgroundColor: "white" }}
                >
                  <a href="#" target="_blank">
                    <img
                      src={`${URL}/assets/uploads/` + product.image}
                      alt={product.image}
                    />
                  </a>
                  <div className="down-content">
                    <a href={"/product/" + product.id}>
                      <h4>{product.name}</h4>
                    </a>
                    <p id="descriptionCard">
                      {product.description.substring(0, 20)}...
                    </p>

                    <button id="btnCard" href={"/product/" + product.id}>
                      Voir plus
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
