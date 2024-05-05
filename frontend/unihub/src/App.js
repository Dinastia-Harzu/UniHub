import "./App.css";
import Header from "./components/commons/Header.js";
import Inicio from "./components/Inicio.js";
import Footer from "./components/commons/Footer.js";
import Publicar from "./components/Publicar.js";
export default function App() {
  return (
    <div>
      <Header />
      <Publicar />
      <Footer />
    </div>
  );
}
