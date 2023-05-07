




import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/Footer/Footer";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styleDevis.css";
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";

function Devis() {
  const [categories, setCategories] = useState([]);
  const [produits, setProduits] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categorie, setCategorie] = useState("");
  const [product, setProduct] = useState("");
  const [surface, setSurface] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState('');

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

  useEffect(() => {
    // Logique pour récupérer le token du client
    const token = localStorage.getItem('token'); // Exemple : stockage du token dans le localStorage

    setToken(token);
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCategorie(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/devis", {
      categorie: categorie,
      product: product,
      surface: surface,
      description: description,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log(res.data);
      // Réinitialiser les champs après le succès de la requête
      setSelectedCategory("");
      setCategorie("");
      setProduct("");
      setSurface("");
      setDescription("");
    })
    .catch((err) => {
      console.log(err);
      // Gérer les erreurs et afficher un message d'erreur approprié
    });
  };

  const handleProductChange = (e) => {
    setProduct(e.target.value);
  };

  const handleSurfaceChange = (e) => {
    setSurface(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <Form className="formDevis" onSubmit={handleSubmit}>
        <Form.Select
          aria-label="Default select example"
          onChange={handleCategoryChange}
          value={selectedCategory} // Ajout de la valeur sélectionnée
        >
            {/* Désactiver l'option par défaut */}
          <option disabled value="">Categorie</option> 
          {categories.map((categorie) => (
         <option key={categorie.id} value={categorie.id}>
         {categorie.name}
       </option>
          ))}
        </Form.Select>
        <Form.Select
          aria-label="Default select example"
          onChange={handleProductChange}
          value={product} // Ajout de la valeur sélectionnée
        >
          <option disabled value="">Produit</option> {/* Désactiver l'option par défaut */}
          {produits.map((produit) => (
            <option key={produit.id} value={produit.id}>
              {produit.name}
            </option>
          ))}
        </Form.Select>
        <InputGroup className="mb-3" onChange={handleSurfaceChange}>
          <InputGroup.Text>Surface</InputGroup.Text>
          <Form.Control
            aria-label="Amount (to the nearest dollar)"
            value={surface} // Ajout de la valeur saisie
          />
          <InputGroup.Text>m2</InputGroup.Text>
        </InputGroup>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Comments"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            onChange={handleDescriptionChange}
            value={description} // Ajout de la valeur saisie
          />
        </FloatingLabel>
        <Button type="submit">Envoyer</Button>
      </Form>
      <Footer />
    </div>
  );
}

export default Devis;