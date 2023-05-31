

import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import "./styleRegister.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (errors.length === 0) {
      axios
        .post("http://localhost:3003/api/register", {
          username: username,
          email: email,
          phone: phone,
          password: password,
          repeatPassword: repeatPassword,
        })
        .then((response) => {
          console.log(response.data);
          navigate("/login");
        })
        .catch((error) => {
          console.log(error.response.data);
          // Afficher un message d'erreur ou une notification pour l'utilisateur
        });
    } else {
      setErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!username.trim()) {
      errors.push("Le champ 'Nom' est obligatoire");
    }
    if (!email.trim()) {
      errors.push("Le champ 'Email' est obligatoire");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.push("Le champ 'Email' n'est pas valide");
    }
    if (!phone.trim()) {
      errors.push("Le champ 'Phone' est obligatoire");
    } else if (!/^\d+$/.test(phone)) {
      errors.push("Le champ 'Phone' n'est pas valide");
    }
    if (!password.trim()) {
      errors.push("Le champ 'Password' est obligatoire");
    } else if (password.length < 8) {
      errors.push("Le champ 'Password' doit contenir au moins 8 caractères");
    }
    if (!repeatPassword.trim()) {
      errors.push("Le champ 'Repeat password' est obligatoire");
    } else if (repeatPassword !== password) {
      errors.push(
        "Les champs 'Password' et 'Repeat password' doivent correspondre"
      );
    }
    return errors;
  };
 

  return (
    <div>
      <Navbar />
      <Form className="formRegister" onSubmit={handleSubmit} >
        <h1 className="titleRegister">Crée un compte</h1>
      
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Nom:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.includes("Le champ 'Nom' est obligatoire") && (
            <Alert variant="danger">Le champ 'Nom' est obligatoire</Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.includes("Le champ 'Email' est obligatoire") && (
            <Alert variant="danger">Le champ 'Email' est obligatoire</Alert>
          )}
          {errors.includes("Le champ 'Email' n'est pas valide") && (
            <Alert variant="danger">Le champ 'Email' n'est pas valide</Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Téléphone:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.includes("Le champ 'Phone' est obligatoire") && (
            <Alert variant="danger">Le champ 'Phone' est obligatoire</Alert>
          )}
          {errors.includes("Le champ 'Phone' n'est pas valide") && (
            <Alert variant="danger">Le champ 'Phone' n'est pas valide</Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mot de passe:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.includes("Le champ 'password' est obligatoire") && (
            <Alert variant="danger">Le champ 'Mot de passe' est obligatoire</Alert>
          )}
          {errors.includes(
            "Le champ 'password' doit contenir au moins 8 caractères"
          ) && (
            <Alert variant="danger">
              Le champ 'Mot de passe' doit contenir au moins 8 caractères
            </Alert>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
          <Form.Label>Confirmation mot de passe:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmer votre mot de passe"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          {errors.includes("Le champ 'Repeat password' est obligatoire") && (
            <Alert variant="danger">
              Le champ 'Confirmation mot de passe' est obligatoire
            </Alert>
          )}
          {errors.includes(
            "Les champs 'Password' et 'Repeat password' doivent correspondre"
          ) && (
            <Alert variant="danger">
              Les champs 'Mot de passe' et 'Confirmation mot de passe' doivent correspondre
            </Alert>
          )}
        </Form.Group>
        <Button className="btnRegister" type="submit">
      S'inscrire
    </Button>
      </Form>
      <Footer />
    </div>
  );
}

export default Register;
