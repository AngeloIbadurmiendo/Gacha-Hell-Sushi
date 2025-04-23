import React from "react";
import { Link } from "react-router-dom";

interface ProfileProps {
  username: string;
  avatarUrl: string;
}

const Profile: React.FC<ProfileProps> = ({ username, avatarUrl }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg max-w-md mx-auto mt-6 shadow-md">
      {/* Avatar */}
      <img
        src={avatarUrl}
        alt={`${username}'s avatar`}
        className="w-24 h-24 rounded-full mb-4 border-2 border-gray-300"
      />

      {/* Username */}
      <h2 className="text-3xl font-bold mb-6 text-center">{username}</h2>

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
        <Link
          to="/login"
          className="py-2 bg-blue-400 text-white rounded-full text-center hover:bg-gray-500"
        >
          Cerrar sesión
        </Link>
      </div>
    </div>
  );
};

export default Profile;
