import "./App.css";
import "./styles/general.css"
import Header from "./components/commons/Header.js"
import Footer from "./components/commons/Footer.js"
import Main from "./components/commons/Main.js"

export default function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
