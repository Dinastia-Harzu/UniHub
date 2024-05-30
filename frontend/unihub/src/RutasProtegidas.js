import { Outlet, Navigate } from "react-router-dom";
import { UsuarioSesion } from "./components/commons/SessionStorage";

export default function RutasProtegidas({ logueado = false }) {
  return ((UsuarioSesion() != null) ^ logueado) ? <Outlet /> : <Navigate to="/no-autorizado" />;
}
