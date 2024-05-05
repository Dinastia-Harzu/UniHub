import "./App.css";
import Header from "./components/commons/Header.js";
import Inicio from "./components/Inicio.js";
import Footer from "./components/commons/Footer.js";
import Perfilusuario from "./components/Perfilusuario.js";
import Busqueda from "./components/Busqueda.js";

export default function App() {
  return (
    <div>
      <Header />
      <Busqueda />
      {/* <Perfilusuario /> */}
      {/* <Inicio /> */}
      <Footer />
    </div>
  );
}
