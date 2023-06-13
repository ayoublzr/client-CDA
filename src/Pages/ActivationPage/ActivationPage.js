import React from 'react'
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ActivationPage() {
    const{activationcode}=useParams()
    console.log(activationcode)
    axios.post(`http://localhost:3003/api/auth/verifyuser/${activationcode}`)
    
  return (
    <div>
        <Navbar/>
        <h2 style={{"color":"#FF9A01"}}>Votre adresse e-mail a bien été vérifiée. </h2>
        <a href='/login'> connectez-vous </a>
        <Footer/>
    </div>
  )
}
