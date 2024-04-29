import "./App.css";
import "./styles/general.css"
import Header from "./components/commons/Header.js"
import { Detalles } from "./Detalles.js";

export default function App() {
  return (
    <div>
      <Header />
      <Detalles/>
    </div>
  );
}
