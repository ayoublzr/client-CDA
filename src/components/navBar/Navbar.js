import "./Navbar.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Navbar() {
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`http://localhost:3003/api/isAuth`, {
          headers: {
            Authorization: token,
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
        .catch((err) => {
          console.log(err);
          setAuth(false);
          setMessage("Erreur lors de la vérification de l'authentification.");
        });
    } else {
      setAuth(false);
    }
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    localStorage.removeItem("token");

    if (token) {
      axios
        .get("http://localhost:3003/api/logout", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          if (res.data.status === "Success") {
            window.location.reload();
          } else {
            alert("Erreur lors de la déconnexion");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Erreur lors de la déconnexion");
        });
    } else {
      alert("Erreur lors de la déconnexion");
    }
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
            A PROPOS
          </a>
        </li>
        {auth ? (
          <li id="listNav">
            <a id="lienNav" href="/" onClick={handleLogout}>
              déconnexion
            </a>
          </li>
        ) : (
          <li id="listNav">
            <a id="lienNav" href="/login">
              connexion
            </a>
          </li>
        )}
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
