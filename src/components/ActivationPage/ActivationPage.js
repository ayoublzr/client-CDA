import React from 'react'
import Navbar from "../../components/navBar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ActivationPage() {
    const{activationcode}=useParams()
    console.log(activationcode)
    axios.post(`http://localhost:3000/api/auth/verifyuser/${activationcode}`)
    
  return (
    <div>
        <Navbar/>
        <Footer/>
    </div>
  )
}
