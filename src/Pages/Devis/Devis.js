import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/Footer/Footer";
import React, { useState, useEffect } from "react";
import jwt from "jwt-decode";
import axios from "axios";
import "./styleDevis.css";
import {
  Button,
  FloatingLabel,
  Form,
  InputGroup,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Devis() {
  const [categories, setCategories] = useState([]);
  const [produits, setProduits] = useState([]);
  const [id, setId] = useState();
  const [commentaire, setCommentaire] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isAuth, setIsAuth] = useState(true)
  const navigate = useNavigate();

  const [forms, setForms] = useState([
    { categorie: "", product: "", surface: "", description: "" },
  ]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get("http://localhost:3003/api/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    forms.forEach((form, index) => {
      if (form.categorie) {
        axios
          .get(`http://localhost:3003/api/products/categorie/${form.categorie}`)
          .then((res) => {
            const updatedProduits = [...produits];
            updatedProduits[index] = res.data;
            setProduits(updatedProduits);
          })
          .catch((err) => console.log(err));
      }
    });
  }, [forms]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const dataToken = jwt(token);
      setId(dataToken.id);
      setShowMessage(false);
    } else {
      setShowMessage(true);
      setIsAuth(false)
      setTimeout(() => {
        navigate("/login");
        setShowMessage(false);
      }, 3000); 
    }
  }, [navigate]);

  const handleCommentaireChange = (e) => {
    const { value } = e.target;
    setCommentaire(value);
  };

  const handleCategoryChange = (e, index) => {
    const { value } = e.target;
    setForms((prevForms) =>
      prevForms.map((form, i) =>
        i === index ? { ...form, categorie: value, product: "" } : form
      )
    );
  };

  const handleProductChange = (e, index) => {
    const { value } = e.target;
    setForms((prevForms) =>
      prevForms.map((form, i) =>
        i === index ? { ...form, product: value } : form
      )
    );
  };

  const handleSurfaceChange = (e, index) => {
    const { value } = e.target;
    setForms((prevForms) =>
      prevForms.map((form, i) =>
        i === index ? { ...form, surface: value } : form
      )
    );
  };

  const handleDescriptionChange = (e, index) => {
    const { value } = e.target;
    setForms((prevForms) =>
      prevForms.map((form, i) =>
        i === index ? { ...form, description: value } : form
      )
    );
  };

  const handleAddForm = () => {
    setForms((prevForms) => [
      ...prevForms,
      { categorie: "", product: "", surface: "", description: "" },
    ]);
  };

  const handleRemoveForm = (index) => {
    setForms((prevForms) => prevForms.filter((form, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const devisData = {
      UserId: id,
      commentaire: commentaire,
      token: token,
    };

    // Envoyer la requête pour créer le devis
    axios
      .post("http://localhost:3003/api/devis", devisData)
      .then((res) => {
        const devisId = res.data.id; // Récupérer l'ID du devis créé

        const sendEmailToAdmin = (DeviId) => {
          const devisData = {
            UserId: id,
            token: token,
            DeviId: DeviId,
          };

          axios
            .post("http://localhost:3003/api/sendDevis", devisData)
            .then((res) => {
              console.log("E-mail sent successfully!");
            })
            .catch((error) => {
              console.log("Error sending e-mail:", error);
            });
        };

        // Créer les devisDetails pour chaque produit dans le formulaire
        const requests = forms.map((form) => {
          const devisDetailsData = {
            surface: form.surface,
            detail: form.description,
            DeviId: devisId,
            ProductId: form.product,
          };

          // Retourner la promesse pour chaque requête de création de devisDetails
          return axios.post(
            "http://localhost:3003/api/devis-details",
            devisDetailsData
          );
        });

        // Exécuter toutes les requêtes de création de devisDetails en parallèle
        return Promise.all(requests)
          .then(() => {
            // Réinitialiser le formulaire après la création du devis
            setForms([
              { categorie: "", product: "", surface: "", description: "" },
            ]);
            // Autres actions de réussite (affichage d'un message, redirection, etc.)
            sendEmailToAdmin(devisId);
          })
          .catch((error) => {
            console.log(error);
            // Gérer les erreurs (affichage d'un message, etc.)
          });
      })
      .catch((error) => {
        console.log(error);
        // Gérer les erreurs (affichage d'un message, etc.)
      });
  };

  return (
    <div>
      <Navbar />
      {showMessage && (
        <Alert variant="danger">
          Veuillez vous connecter pour accéder à la page de demande de devis.
        </Alert>
      )}
      {isAuth &&(


      <Form className="formDevis" onSubmit={handleSubmit}>
        {forms.map((form, index) => (
          <div key={index}>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => handleCategoryChange(e, index)}
              value={form.categorie}
            >
              <option disabled value="">
                Catégorie
              </option>
              {categories.map((categorie) => (
                <option key={categorie.id} value={categorie.id}>
                  {categorie.name}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => handleProductChange(e, index)}
              value={form.product}
            >
              <option disabled value="">
                Produit
              </option>
              {produits[index]?.map((produit) => (
                <option key={produit.id} value={produit.id}>
                  {produit.name}
                </option>
              ))}
            </Form.Select>
            <InputGroup
              className="mb-3"
              onChange={(e) => handleSurfaceChange(e, index)}
            >
              <InputGroup.Text>Surface</InputGroup.Text>
              <Form.Control
                aria-label="Amount (to the nearest dollar)"
                defaultValue={form.surface}
                onChange={(e) => handleSurfaceChange(e, index)}
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
                onChange={(e) => handleDescriptionChange(e, index)}
                value={form.description}
              />
            </FloatingLabel>
            {index > 0 && (
              <Button variant="danger" onClick={() => handleRemoveForm(index)}>
                Supprimer
              </Button>
            )}
          </div>
        ))}
        <Button type="button" onClick={handleAddForm}>
          Ajouter un produit
        </Button>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Commentaire :</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={handleCommentaireChange}
            value={commentaire}
          />
        </Form.Group>
        <Button type="submit">Envoyer</Button>
      </Form>
      )}
      <Footer />
    </div>
  );
}

export default Devis;
