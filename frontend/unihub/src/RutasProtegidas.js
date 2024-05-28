import { Outlet, Navigate } from "react-router-dom";

export default function RutasProtegidas() {
  const usuario = sessionStorage.getItem("usuario");
  return usuario ? <Outlet /> : <Navigate to="/no-autorizado" />
}