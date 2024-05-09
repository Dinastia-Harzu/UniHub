import "./App.css";
import Header from "./components/commons/Header.js";
import Inicio from "./components/Inicio.js";
// import Descubrir from './components/Descubrir';
import Footer from "./components/commons/Footer.js";
import Perfilusuario from "./components/Perfilusuario.js";
import Busqueda from "./components/Busqueda.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Header />}>
    //       <Route index element={<Inicio />} />
    //       {/* <Route path="descubrir" element={<Descubrir />} /> */}
    //       <Route path="busqueda" element={<Busqueda />} />
    //       <Route path="perfil" element={<Perfilusuario />} />
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
    <div>
      <Header />
      <Busqueda />
       <Perfilusuario /> 
      {/* <Inicio /> */}
      <Footer />
    </div>
  );
}
