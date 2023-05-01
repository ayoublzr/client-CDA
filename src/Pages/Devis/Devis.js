import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/Footer/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styleDevis.css";
import { FloatingLabel, Form, InputGroup } from "react-bootstrap";

function Devis() {
  const [categories, setCategories] = useState([]);
  const [produits, setProduits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/categories")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (selectedCategory) {
      axios
        .get(
          `http://localhost:3000/api/products/categorie/${selectedCategory}`
        )
        .then((res) => {
          console.log(res.data);
          setProduits(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [selectedCategory]);
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  return (
    <div>
      <Navbar />
      <div className="formDevis">
        <Form.Select
          aria-label="Default select example"
          onChange={handleCategoryChange}
        >
          <option>Categorie</option>
          {categories.map((categorie) => (
            <option key={categorie.id} value={categorie.id}>
              {categorie.name}
            </option>
          ))}
        </Form.Select>
        <Form.Select aria-label="Default select example">
          <option>Produit</option>
          {produits.map((produit) => (
            <option key={produit.id} value={produit.id}>
              {produit.name}
            </option>
          ))}
        </Form.Select>
        <InputGroup className="mb-3">
          <InputGroup.Text>métrages</InputGroup.Text>
          <Form.Control aria-label="Amount (to the nearest dollar)" />
          <InputGroup.Text>m2</InputGroup.Text>
        </InputGroup>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Comments"
          className="mb-3"
        >
          <Form.Control as="textarea" placeholder="Leave a comment here" />
        </FloatingLabel>
      </div>
      <Footer />
    </div>
  );
}

export default Devis;
