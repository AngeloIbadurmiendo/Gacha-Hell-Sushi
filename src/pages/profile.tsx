import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type UserProfile = {
  nombre: string;
  apellido?: string;
  nombreUsuario?: string;
  correo: string;
  imagenURL?: string;
};

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login")
      return;
    }

    fetch(`http://localhost:3000/usuarios/perfil?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.nombre) setUser(data);
        else setError(data.message || "No se pudo cargar el perfil.");
      })
      .catch(() => setError("Error al conectar al servidor."));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-80">
        <div className="text-gray-600">Cargando perfil...</div>
      </div>
    );
  }

  // Avatar de respaldo si no hay imagenURL
  const avatarUrl =
    user.imagenURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.nombre + " " + (user.apellido || "")
    )}&background=eee&color=374151&size=128`;

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg max-w-md mx-auto mt-6 shadow-md">
      {/* Avatar */}
      <img
        src={avatarUrl}
        alt={`${user.nombre} avatar`}
        className="w-24 h-24 rounded-full mb-4 border-2 border-gray-300"
      />

      {/* Username */}
      <h2 className="text-3xl font-bold mb-2 text-center">
        {user.nombre} {user.apellido}
      </h2>
      <div className="mb-4 text-gray-500">{user.correo}</div>

      {/* Options */}
      <div className="flex flex-col w-full space-y-7">
        <Link
          to="/orders"
          className="py-2 bg-blue-900 text-white rounded-full text-center hover:bg-blue-700"
        >
          Tus pedidos
        </Link>
        <Link
          to="/directions"
          className="py-2 bg-blue-900 text-white rounded-full text-center hover:bg-blue-700"
        >
          Tus direcciones
        </Link>
        <Link
          to="/configs"
          className="py-2 bg-blue-900 text-white rounded-full text-center hover:bg-blue-700"
        >
          Configuración
        </Link>
        <Link
          to="/help"
          className="py-2 bg-blue-900 text-white rounded-full text-center hover:bg-blue-700"
        >
          Ayuda
        </Link>
        <button
          onClick={handleLogout}
          className="py-2 bg-blue-400 text-white rounded-full text-center hover:bg-gray-500"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
