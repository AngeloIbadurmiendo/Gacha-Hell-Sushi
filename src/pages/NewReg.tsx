import React, { useState, FormEvent } from "react";

const Signup: React.FC = () => {
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [contrasenia, setContrasenia] = useState<string>("");
  const [aceptaTerminos, setAceptaTerminos] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [ok, setOk] = useState<string>("");

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setOk("");
    if (!aceptaTerminos) {
      setError("Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/usuarios/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          apellido,
          correo,
          contrasenia,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOk("¡Registro exitoso! Ahora puedes iniciar sesión.");
        // Puedes redirigir al login aquí si quieres
      } else {
        setError(data.message || "Error al registrarse");
      }
    } catch {
      setError("No se pudo conectar al servidor");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-[#FDF0D5] rounded-lg max-w-md mx-auto mt-10 shadow-lg">
      <div className="w-full flex justify-between items-center bg-[#FDF0D5] p-4 rounded-lg">
        <h1 className="text-xl font-bold text-gray-800 mx-auto">Registra tu cuenta</h1>
      </div>

      <form onSubmit={handleSignup} className="w-full">
        <input
          type="text"
          placeholder="Nombre"
          className="bg-gray-100 border border-gray-300 p-3 rounded-lg w-full mt-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Apellido"
          className="bg-gray-100 border border-gray-300 p-3 rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          className="bg-gray-100 border border-gray-300 p-3 rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="bg-gray-100 border border-gray-300 p-3 rounded-lg w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
          required
        />

        <div className="mt-4 flex items-center space-x-2 w-full">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            checked={aceptaTerminos}
            onChange={() => setAceptaTerminos(!aceptaTerminos)}
          />
          <label className="text-sm text-gray-600">
            Acepto los términos y condiciones de uso
          </label>
        </div>

        {error && (
          <div className="text-red-600 text-sm mt-4 text-center">{error}</div>
        )}
        {ok && (
          <div className="text-green-600 text-sm mt-4 text-center">{ok}</div>
        )}

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Signup;
