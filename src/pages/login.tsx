import React from "react";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom

const Login = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-[#FDF0D5] rounded-lg max-w-sm mx-auto mt-10 shadow-lg">
      {/* Header */}
      <div className="w-full text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Inicia Sesión</h1>
        <p className="text-sm text-gray-500">Accede a tu cuenta para continuar</p>
      </div>

      {/* Input: Usuario */}
      <div className="w-full mb-4">
        <input
          type="text"
          placeholder="Usuario"
          className="bg-gray-100 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Input: Contraseña */}
      <div className="w-full mb-6">
        <input
          type="password"
          placeholder="Contraseña"
          className="bg-gray-100 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Botón: Iniciar Sesión */}
      <button className="w-full bg-blue-900 text-white py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4">
        Iniciar Sesión
      </button>

      {/* Botón: Registrarse */}
      <Link
        to="/signup" // Navegación con Link
        className="w-full bg-blue-400 text-white py-3 rounded-full text-center border border-gray-300 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Registrarse
      </Link>
    </div>
  );
};

export default Login;