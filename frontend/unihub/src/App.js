import logo from "./logo.svg";
import "./App.css";

export default function App() {
  return (
    <div className="App-header">
      <MiBoton img={logo} />
    </div>
  );
}

function MiBoton(obj) {
  console.log(obj);
  return <img src={obj.img} className="App-logo" alt="logo" />;
}
