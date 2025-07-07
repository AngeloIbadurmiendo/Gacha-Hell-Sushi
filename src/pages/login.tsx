import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [correo, setCorreo] = useState<string>("");
  const [contrasenia, setContrasenia] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasenia }),
      });

      const data = await response.json();

      if (response.ok) {
        // Aquí puedes guardar userId/token y redirigir
        localStorage.setItem("userId", data.userId);
        navigate("/perfil");
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch {
      setError("No se pudo conectar al servidor");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-[#FDF0D5] rounded-lg max-w-sm mx-auto mt-10 shadow-lg">
      <div className="w-full text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inicia Sesión</h1>
        <p className="text-sm text-gray-500">Accede a tu cuenta para continuar</p>
      </div>

      <form onSubmit={handleLogin} className="w-full">
        <input
          type="email"
          placeholder="Correo"
          className="bg-gray-100 border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="bg-gray-100 border border-gray-300 p-3 rounded-lg w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
          required
        />

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        >
          Iniciar Sesión
        </button>
      </form>

      <Link
        to="/signup"
        className="w-full bg-blue-400 text-white py-3 rounded-full text-center border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Registrarse
      </Link>
    </div>
  );
};

export default Login;
