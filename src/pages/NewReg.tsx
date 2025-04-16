const Signup = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-lg max-w-md mx-auto mt-10 shadow-lg">
      {/* Header */}
      <div className="w-full flex justify-between items-center bg-gray-100 p-4 rounded-lg">
        <h1 className="text-xl font-bold text-gray-800">Registra tu cuenta</h1>
      </div>

      {/* Input: Nombre */}
      <div className="mt-6 w-full">
        <input
          type="text"
          placeholder="Nombre"
          className="bg-gray-100 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Input: Apellido */}
      <div className="mt-4 w-full">
        <input
          type="text"
          placeholder="Apellido"
          className="bg-gray-100 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Input: Correo Electrónico */}
      <div className="mt-4 w-full">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="bg-gray-100 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Input: Contraseña */}
      <div className="mt-4 w-full">
        <input
          type="password"
          placeholder="Contraseña"
          className="bg-gray-100 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Checkbox: Términos y Condiciones */}
      <div className="mt-4 flex items-center space-x-2 w-full">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="text-sm text-gray-600">
          Acepto los términos y condiciones de uso
        </label>
      </div>

      {/* Botón: Registrarse */}
      <button className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Registrarse
      </button>
    </div>
  );
};

export default Signup;