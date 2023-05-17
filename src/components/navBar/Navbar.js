import "./Navbar.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Navbar() {

  const [auth, setAuth] = useState(false);
  
  const[message, setMessage] = useState('')

  // axios.defaults.withCredentials = true
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/isAuth`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          setAuth(true);
        } else {
          setAuth(false);
          setMessage(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/api/logout", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        
        if (res.data.Status ) {
         
          localStorage.removeItem("token"); // Supprimez le token du localStorage
          window.location.reload();
        } else {
          alert("Erreur lors de la déconnexion");
        }
      })
      .catch((err) => console.log(err));
  };


  return (
    <nav id="navbar">
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fa fa-bars"></i>
      </label>
      <label className="logo">SLQ</label>
      <ul id="ulNav">
        <li id="listNav">
          <a id="lienNav" href="/">
            Accueil
          </a>
        </li>
        <li id="listNav">
          <a id="lienNav" href="/products">
            Produits
          </a>
        </li>
        <li id="listNav">
          <a id="lienNav" href="#">
            réalisations
          </a>
        </li>
        <li id="listNav">
          <a id="lienNav" href="#">
            Contact
          </a>
        </li>
        {
        auth ? 
          <li id="listNav">
            <a id="lienNav"  href="/" onClick={handleLogout} >
              déconnexion
            </a>
          </li>
        : 
          <li id="listNav">
            <a id="lienNav" href="/login">
              connexion
            </a>
          </li>
        }
        <li id="listNav">
          <a id="devisNav" href="/devis">
            demande de devis
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
