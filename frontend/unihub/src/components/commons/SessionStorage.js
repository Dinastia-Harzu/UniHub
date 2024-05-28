function comprobarDatoSS(clave) {
  return sessionStorage.getItem(clave) != null;
}

export function SessionStorage(clave) {
  if (comprobarDatoSS(clave)) {
    return JSON.parse(sessionStorage.getItem(clave));
  }
  return null;
}

export function UsuarioSesion(clave = null) {
  const usuario =
    SessionStorage("usuario")?.datos ?? (clave ? { datos: {} } : null);
  return clave ? usuario[clave] ?? null : usuario;
}

export function TokenSesion() {
  return SessionStorage("usuario")?.token ?? "";
}

export function InsertarEnSS(clave, valor) {
  if (typeof valor !== "string") {
    valor = JSON.stringify(valor) ?? "undefined";
  }
  sessionStorage.setItem(clave, valor);
}

export function GuardarUsuario(datos) {
  InsertarEnSS("usuario", datos);
}
