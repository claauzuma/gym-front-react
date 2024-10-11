import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";



const LoginPage = () => {
  const { user, setUser, isAuthenticated, setLogeado } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Realiza la petición al backend
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, // Usamos el estado del email
          password, // Usamos el estado del password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        const decryptedToken = jwtDecode(token); // Decodifica el token
        const { rol } = decryptedToken;
        console.log("Logeamos bien")
        setLogeado(true);

        // Guarda el token en localStorage
        localStorage.setItem("token", token);

        if (rol === "admin") {
          navigate("/admin");
        } else if (rol === "profe") {
          navigate("/profesor");
        } else if (rol === "alumno") {
          navigate("/alumno");
        } else {
          setError("Rol no reconocido");
        }
      } else {
        // Si las credenciales son incorrectas
        setError(data.message);
      }
    } catch (err) {
      setError("Error en el servidor");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>} 
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
        <div className="text-sm text-center">
          <a href="#" className="text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
