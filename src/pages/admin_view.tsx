import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const AdminView: React.FC = () => {
  const [totalPedidos, setTotalPedidos] = useState<number>(0)
  const [totalUsuarios, setTotalUsuarios] = useState<number>(0)
  const [totalProductos, setTotalProductos] = useState<number>(0)

  useEffect(() => {
    // Obtener total de pedidos
    fetch("http://localhost:3000/pedidos_admin")
      .then((res) => res.json())
      .then((data) => setTotalPedidos(data.length))
      .catch(() => setTotalPedidos(0))

    // Obtener total de usuarios
    fetch("http://localhost:3000/usuarios")
      .then((res) => res.json())
      .then((data) => setTotalUsuarios(data.length))
      .catch(() => setTotalUsuarios(0))

    // Obtener total de productos
    fetch("http://localhost:3000/productos")
      .then((res) => res.json())
      .then((data) => setTotalProductos(data.length))
      .catch(() => setTotalProductos(0))
  }, [])

  return (
    <div className='flex flex-col md:flex-row bg-gray-100'>
      {/* Main Content */}
      <main className='flex-1 p-6 order-first md:order-last'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>
          Bienvenido, Administrador
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Total Pedidos */}
          <div className='p-4 bg-white rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.5)]'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Total Pedidos
            </h2>
            <p className='text-2xl font-bold text-blue-900'>{totalPedidos}</p>
          </div>
          {/* Total Usuarios */}
          <div className='p-4 bg-white rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.5)]'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Usuarios Registrados
            </h2>
            <p className='text-2xl font-bold text-blue-900'>{totalUsuarios}</p>
          </div>
          {/* Productos Activos */}
          <div className='p-4 bg-white rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.5)]'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Productos Activos
            </h2>
            <p className='text-2xl font-bold text-blue-900'>{totalProductos}</p>
          </div>
        </div>
      </main>

      {/* Sidebar */}
      <aside className='w-full md:w-64 bg-[#FDF0D5] text-black flex flex-col shadow-[0_4px_6px_rgba(0,0,0,0.5)] rounded-lg order-last md:order-first'>
        <div className='p-4 text-center font-bold text-xl border-b border-black-700'>
          Dashboard
        </div>
        <nav className='flex-1 space-y-4 divide-y divide-black-1000 py-4'>
          <Link to='/admin_orders' className='block px-4 hover:bg-blue-700'>
            Pedidos
          </Link>
          <Link to='/admin_products' className='block px-4 hover:bg-blue-700'>
            Productos
          </Link>
          <Link to='/admin_users' className='block px-4 hover:bg-blue-700'>
            Usuarios
          </Link>
        </nav>
        <div className='p-4'>
          <Link
            to='/'
            className='w-full py-2 px-4 bg-blue-400 rounded hover:bg-red-700 text-white text-center block'
          >
            Cerrar sesión
          </Link>
        </div>
      </aside>
    </div>
  )
}

export default AdminView
