import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/Footer/Footer";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styleLogin.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
 const URL= process.env.REACT_APP_URL

  const handleSubmit = (event) => {
    event.preventDefault();

    // Vérification des champs obligatoires
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    axios
      .post(`${URL}/api/login`, {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        const token = response.data.token;
        // Stockez le jeton dans le stockage local
        localStorage.setItem("token", token);

        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        // Afficher un message d'erreur ou une notification pour l'utilisateur
        setErrorMessage("Email ou mot de passe incorrect");
      });
  };

  return (
    <div>
      <Navbar />

      <Form className="formLogin" onSubmit={handleSubmit}>
        <h1 className="titleLogin">Connexion</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Adresse Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <a href="/register">Créer un compte</a>
        </Form.Group>
        <Form.Group>
          <a href="/resetpassword">Mot de passe oublié !</a>
        </Form.Group>
        <Button variant="primary" type="submit">
          Se connecter
        </Button>
        {errorMessage && (
          <Alert variant="danger" className="mt-3">
            {errorMessage}
          </Alert>
        )}
      </Form>
      <Footer />
    </div>
  );
}

export default Login;
