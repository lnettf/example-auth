import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import axios from "axios";

// Componente ProtectedRoute que toma un objeto de propiedades (children)
const ProtectedRoute = ({ children }) => {
  // Verifica si hay un token de autenticación almacenado en el localStorage del navegador
  const loginToken = localStorage.getItem("token");

  // Si no hay un token de autenticación, redirige al usuario a la página de inicio de sesión
  if (!loginToken) {
    return <Navigate to="/login" />;
  }

  // Si hay un token de autenticación, permite que se renderice el contenido protegido
  return <>{children}</>;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

// Intercepta las solicitudes antes de ser enviadas y modifica la configuración de la solicitud
axios.interceptors.request.use(config => {
  // Obtiene el token de autenticación almacenado en el localStorage del navegador
  const authToken = localStorage.getItem('token');

  // Verifica si hay un token de autenticación
  if (authToken) {
    // Si hay un token, agrega el encabezado de autorización a la configuración de la solicitud
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  // Devuelve la configuración de la solicitud modificada
  return config;
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
