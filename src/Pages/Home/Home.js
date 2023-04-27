import "bootstrap/dist/css/bootstrap.css";
import Navbar from"../../components/navBar/Navbar";
import Footer from"../../components/Footer/Footer"
import Carrousel from "../../components/Carrousel/Carrousel"

import "./Style.css";

export default function Home() {
  return (
    <body>
      <Navbar />
      <div id="main">
        <Carrousel/>
      </div>
      <Footer />
    </body>
  );
}
