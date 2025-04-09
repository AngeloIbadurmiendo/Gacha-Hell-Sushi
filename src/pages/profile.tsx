import React from "react"

// TODO: Agregar estilos correctos

interface ProfileProps {
  username: string
  avatarUrl: string
}

const Profile: React.FC<ProfileProps> = ({ username, avatarUrl }) => {
  return (
    <div className='flex flex-col items-center p-6 bg-gray-100 rounded-lg max-w-md mx-auto mt-6 shadow-md'>
      {/* Avatar */}
      <img
        src={avatarUrl}
        alt={`${username}'s avatar`}
        className='w-24 h-24 rounded-full mb-4 border-2 border-gray-300'
      />

      {/* Username */}
      <h2 className='text-xl font-bold mb-6 text-center'>{username}</h2>

      {/* Options */}
      <div className='flex flex-col w-full space-y-3'>
        <button className='py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700'>
          Tus pedidos
        </button>
        <button
          className='py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700'
          onClick={() => (window.location.href = "/directions")}
        >
          Tus direcciones
        </button>
        <button className='py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700'>
          Configuración
        </button>
        <button className='py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700'>
          Ayuda
        </button>
        <button
          className='py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500'
          onClick={() => (window.location.href = "/login")}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}

export default Profile
