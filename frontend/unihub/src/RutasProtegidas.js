import { Outlet, Navigate } from "react-router-dom";
import { UsuarioSesion } from "./components/commons/SessionStorage";

export default function RutasProtegidas() {
  return UsuarioSesion() ? <Outlet /> : <Navigate to="/no-autorizado" />;
}
