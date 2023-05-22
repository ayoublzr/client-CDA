import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { activationcode } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:3000/api/newpassword/${activationcode}`, {
        password: password,
        repeatPassword: repeatPassword,
      })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mot de passe:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
          <Form.Label>Confirmation mot de passe:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="btnRegister" type="submit">
          S'inscrire
        </Button>
      </Form>
    </div>
  );
}
