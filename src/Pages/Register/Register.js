// import React, { useState } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import "./styleRegister.css";

// function Register() {
// const [username, setUsername] = useState('');
// const [email, setEmail] = useState('');
// const [phone, setPhone] = useState('');
// const [password, setPassword] = useState('');
// const [repeatPassword, setRepeatPassword] = useState('');
// const navigate = useNavigate();

// const handleSubmit = (event) => {
// event.preventDefault();
// axios.post('http://localhost:3000/api/register', {
// username: username,
// email: email,
// phone: phone,
// password: password,
// repeatPassword: repeatPassword
// })
// .then(response => {
// console.log(response.data);
// navigate("/login")

// })
// .catch(error => {
// console.log(error.response.data);
// // Afficher un message d'erreur ou une notification pour l'utilisateur
// });
// }

// return (
// <div>
// <Form className="formRegister" onSubmit={handleSubmit}>
// <h1 className='titleRegister'>Crée un compte</h1>
// <Form.Group className="mb-3" controlId="formBasicUsername">
// <Form.Label>User:</Form.Label>
// <Form.Control type="text" placeholder="Nom" value={username} onChange={(e) => setUsername(e.target.value)} />
// </Form.Group>
// <Form.Group className="mb-3" controlId="formBasicEmail">
//       <Form.Label>Email:</Form.Label>
//       <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//     </Form.Group>

//     <Form.Group className="mb-3" controlId="formBasicPhone">
//       <Form.Label>Phone:</Form.Label>
//       <Form.Control type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
//     </Form.Group>

//     <Form.Group className="mb-3" controlId="formBasicPassword">
//       <Form.Label>Password:</Form.Label>
//       <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//     </Form.Group>

//     <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
//       <Form.Label>Repeat password:</Form.Label>
//       <Form.Control type="password" placeholder="Repeat password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
//     </Form.Group>

//     <Button variant="primary" type="submit">
//       Submit
//     </Button>
//   </Form>
// </div>
// )
// }

// export default Register;



import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from 'axios';
import "./styleRegister.css";

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (errors.length === 0) {
      axios.post('http://localhost:3000/api/register', {
        username: username,
        email: email,
        phone: phone,
        password: password,
        repeatPassword: repeatPassword
      })
      .then(response => {
        console.log(response.data);
        navigate("/login")
      })
      .catch(error => {
        console.log(error.response.data);
        // Afficher un message d'erreur ou une notification pour l'utilisateur
      });
    }
  }

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
      errors.push("Les champs 'Password' et 'Repeat password' doivent correspondre");
    }
    return errors;
  }

  return (
    <div>
        <Navbar/>
      <Form className="formRegister" onSubmit={handleSubmit}>
        <h1 className='titleRegister'>Crée un compte</h1>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>User:</Form.Label>
          <Form.Control type="text" placeholder="Nom" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label>Phone:</Form.Label>
          <Form.Control type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
       </Form.Group>
       <Form.Group className="mb-3" controlId="formBasicRepeatPassword">
  <Form.Label>Repeat password:</Form.Label>
  <Form.Control type="password" placeholder="Repeat password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
</Form.Group>
<Button variant="primary" type="submit" className="submitButton">
  Créer un compte
</Button>
</Form>
<Footer/>
</div>
);
}

export default Register;









   