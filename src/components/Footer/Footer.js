import React from 'react'
import './Style.css'

function Footer() {
  return (
    <container >
        <div>
            <h1 className='logoFooter'>SLQ</h1>
            <h3>Société Lamti De Quincaillerie</h3>
        </div>
        <div>
            <nav>
                <ul>
                <li><a id='produit' href="#">PRODUIT</a></li>
                <li><a id='realisation' href="#">REALISATION</a></li>
                <li><a id='contact' href="#">CONTACT</a></li>
                <li><a id='about' href="#">A PROPOS</a></li>
                <li><a id='devis' href="#">DEMANDE DE DEVIS</a></li>
            </ul>
            </nav>
            <hr ></hr>
        </div>
        <p id='textFooter'>© Copyright.All Rights Reserved</p>
    </container>
  )
}

export default Footer