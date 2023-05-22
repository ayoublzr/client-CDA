import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:3000/api/resetpassword/`, {
        email: email,
      })
      .then((response) => {
        console.log(response.data);
        setShowMessage(true); // Afficher le message avant la navigation

        setTimeout(() => {
          setShowMessage(false); // Masquer le message après 3 secondes
          navigate("/login"); // Naviguer vers la page de connexion
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div>
      {showMessage && (
        <Alert variant="success">
          Veuillez vérifier votre adresse e-mail pour modifier votre mot de passe.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Button className="btnRegister" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
