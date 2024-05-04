import "./App.css";
import "./styles/general.css";
import Header from "./components/commons/Header.js";
import Inicio from "./components/Inicio.js";
import Footer from "./components/commons/Footer.js";
import Perfilusuario from "./components/Perfilusuario.js";
export default function App() {
  return (
    <div>
      <Header />
      <Perfilusuario />
      <Inicio />
      <Footer />
    </div>
  );
}
