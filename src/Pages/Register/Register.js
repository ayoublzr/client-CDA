import React, { useState , useEffect} from "react";
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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const URL= process.env.REACT_APP_URL
  useEffect(() => {
    let timer;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false);
        navigate("/login"); // Redirection vers la page de login
      }, 4000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showSuccessMessage, navigate]);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length === 0) {
      axios
        .post(`${URL}/api/register`, {
          username: username,
          email: email,
          phone: phone,
          password: password,
          repeatPassword: repeatPassword,
        })
        .then((response) => {
          console.log(response.data);
          setShowSuccessMessage(true);
          
        })
        
        .catch((error) => {
          console.log(error.response.data);
          setErrors(error.response.data.errors);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const validationErrors = [];
    if (!username.trim()) {
      validationErrors.push("Le champ 'Nom' est obligatoire");
    }
    if (!email.trim()) {
      validationErrors.push("Le champ 'Email' est obligatoire");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.push("Le champ 'Email' n'est pas valide");
    }
    if (!phone.trim()) {
      validationErrors.push("Le champ 'Téléphone' est obligatoire");
    } else if (!/^\d+$/.test(phone)) {
      validationErrors.push("Le champ 'Téléphone' n'est pas valide");
    }else if (phone.length < 10) {
      validationErrors.push("Le champ 'Téléphone' doit contenir au moins 10 caractères");
    }
    if (!password.trim()) {
      validationErrors.push("Le champ 'Mot de passe' est obligatoire");
    } else if (password.length < 8) {
      validationErrors.push(
        "Le champ 'Mot de passe' doit contenir au moins 8 caractères"
      );
    }
    if (!repeatPassword.trim()) {
      validationErrors.push("Le champ 'Confirmation mot de passe' est obligatoire");
    } else if (repeatPassword !== password) {
      validationErrors.push(
        "Les champs 'Mot de passe' et 'Confirmation mot de passe' doivent correspondre"
      );
    }
    return validationErrors;
  };

  return (
    <div>
      <Navbar />
      {showSuccessMessage && ( 
        <Alert variant="success">
          Veuillez vérifier votre adresse e-mail pour valider votre compte.
        </Alert>
      )}
      <Form className="formRegister" onSubmit={handleSubmit}>
        <h1 className="titleRegister">Crée un compte</h1>

        {errors.length > 0 && (
          <Alert variant="danger">
            <p>{errors[0]}</p>
          </Alert>
        )}

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Nom:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Téléphone:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Mot de passe:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
          <Form.Label>Confirmation mot de passe:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmer votre mot de passe"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
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
