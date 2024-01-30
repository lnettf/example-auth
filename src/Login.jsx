import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la llamada Axios para enviar datos al servidor
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        formData
      );

      // Verifica si existe un token en la respuesta de la API
      if (response.data.data.token) {
        // Si hay un token, almacénalo en el localStorage del navegador
        localStorage.setItem("token", response.data.data.token);

        // Redirige al usuario a la página principal
        return navigate("/");
      }


      // Manejar la respuesta del servidor según sea necesario
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      // Manejar errores en la llamada Axios
      console.error("Error al enviar datos:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleFormChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleFormChange}
          required
        />
      </div>
      <div>
        <button type="submit">Iniciar sesión</button>
      </div>
    </form>
  );
}

export default Login;
