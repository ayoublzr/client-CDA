import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from 'react';
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/Footer/Footer";
import axios from 'axios';
import "./styleCard.css";
import { Form } from "react-bootstrap";

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(res => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div>
      <Navbar />
      
      <Form.Group id="selectCategorie" className="mb-3">
        <Form.Label style={{color:"white"}}>Disabled select menu</Form.Label>
        <Form.Select disabled>
          <option>Disabled select</option>
        </Form.Select>
      </Form.Group>
      
      <div id="cards" className="container" >
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-4" >
              <div className="product-item" style={{backgroundColor:"white"}}>
                <a href="#" target="_blank">
                  <img src={"http://localhost:3000/assets/uploads/"+product.image} alt={product.image} />
                </a>
                <div className="down-content">
                  <a href="#" target="_blank">
                    <h4>{product.name}</h4>
                  </a>
                  <p id="descriptionCard">
                    {product.description}
                  </p>
                  <button id="btnCard">Voir plus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
