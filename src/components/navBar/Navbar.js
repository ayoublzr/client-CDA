import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav id="navbar">
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="checkbtn">
        <i className="fa fa-bars"></i>
      </label>
      <label className="logo">SLQ</label>
      <ul id="ulNav">
        <li id="listNav">
          <a id="lienNav" href="#">Accueil</a>
        </li>
        <li id="listNav">
          <a id="lienNav" href="#">Produits</a>
        </li>
        <li id="listNav">
          <a id="lienNav" href="#">réalisations</a>
        </li>
        <li id="listNav">
          <a id="lienNav" href="#">Contact</a>
        </li>
        <li id="listNav">
          <a id="devisNav" href="#">demande de devis</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
