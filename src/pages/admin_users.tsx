import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

interface User {
  _id: string
  nombre: string
  apellido?: string
  correo: string
  nombreUsuario?: string
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [newUser, setNewUser] = useState({ nombre: "", correo: "" })

  // Obtener usuarios desde la base de datos
  useEffect(() => {
    fetch("http://localhost:3000/usuarios")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]))
  }, [])

  // Búsqueda
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }

  // Crear usuario (solo frontend, deberías hacer POST al backend)
  const handleAddUser = () => {
    // Aquí deberías hacer un POST al backend y luego refrescar la lista
    setShowModal(false)
  }

  // Eliminar usuario (solo frontend, deberías hacer DELETE al backend)
  const handleDeleteUser = (id: string) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    )
    if (confirmDelete) {
      // Aquí deberías hacer un DELETE al backend y luego refrescar la lista
      setUsers(users.filter((user) => user._id !== id))
    }
  }

  // Filtrar usuarios por búsqueda
  const filteredUsers = users.filter(
    (user) =>
      (user.nombre + " " + (user.apellido || ""))
        .toLowerCase()
        .includes(searchTerm) || user.correo.toLowerCase().includes(searchTerm)
  )

  return (
    <div className='p-6 bg-gray-100'>
      <h1 className='text-3xl font-bold mb-4'>Usuarios</h1>

      {/* Barra de búsqueda */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4'>
        <input
          type='text'
          placeholder='Buscar por nombre o email'
          value={searchTerm}
          onChange={handleSearch}
          className='p-2 border border-gray-300 rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          onClick={() => setShowModal(true)}
          className='bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500'
        >
          Crear Usuario
        </button>
      </div>

      {/* Tabla de usuarios */}
      <div className='overflow-x-auto'>
        <div className='hidden sm:block'>
          <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider'>
                  ID
                </th>
                <th className='px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider'>
                  Nombre
                </th>
                <th className='px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider'>
                  Email
                </th>
                <th className='px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider'>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className='border-t border-gray-200'>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {user._id}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {user.nombre} {user.apellido}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {user.correo}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className='text-red-500 hover:text-red-700 focus:outline-none'
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vista móvil */}
        <div className='block sm:hidden'>
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className='border border-gray-200 rounded-lg mb-4 p-4 bg-white shadow-[0_4px_6px_rgba(0,0,0,0.5)]'
            >
              <p className='text-sm text-gray-700'>
                <span className='font-medium'>ID:</span> {user._id}
              </p>
              <p className='text-sm text-gray-700'>
                <span className='font-medium'>Nombre:</span> {user.nombre}{" "}
                {user.apellido}
              </p>
              <p className='text-sm text-gray-700'>
                <span className='font-medium'>Email:</span> {user.correo}
              </p>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className='text-red-500 hover:text-red-700 focus:outline-none mt-2'
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para crear usuario */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
            <h2 className='text-xl font-bold mb-4'>Crear Usuario</h2>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Nombre
              </label>
              <input
                type='text'
                value={newUser.nombre}
                onChange={(e) =>
                  setNewUser({ ...newUser, nombre: e.target.value })
                }
                className='p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Email
              </label>
              <input
                type='email'
                value={newUser.correo}
                onChange={(e) =>
                  setNewUser({ ...newUser, correo: e.target.value })
                }
                className='p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='flex justify-end gap-4'>
              <button
                onClick={() => setShowModal(false)}
                className='bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none'
              >
                Cancelar
              </button>
              <button
                onClick={handleAddUser}
                className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none'
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón para volver */}
      <Link
        to='/admin'
        className='mt-6 bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600 w-full sm:w-auto text-center block sm:inline-block'
      >
        Volver
      </Link>
    </div>
  )
}

export default AdminUsers
