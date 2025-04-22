import React from "react"

const AdminView: React.FC = () => {
  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <aside className='w-64 bg-blue-900 text-white flex flex-col'>
        <div className='p-4 text-center font-bold text-xl border-b border-blue-700'>
          Dashboard
        </div>
        <nav className='flex-1 p-4 space-y-4'>
          <a
            href='/admin/orders'
            className='block py-2 px-4 rounded hover:bg-blue-700'
          >
            Pedidos
          </a>
          <a
            href='/admin/products'
            className='block py-2 px-4 rounded hover:bg-blue-700'
          >
            Productos
          </a>
          <a
            href='/admin/users'
            className='block py-2 px-4 rounded hover:bg-blue-700'
          >
            Usuarios
          </a>
        </nav>
        <div className='p-4 border-t border-blue-700'>
          <button
            onClick={() => (window.location.href = "/")}
            className='w-full py-2 px-4 bg-red-600 rounded hover:bg-red-700'
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-6'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>
          Bienvenido, Administrador
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Example Cards */}
          <div className='p-4 bg-white rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Total Pedidos
            </h2>
            <p className='text-2xl font-bold text-blue-900'>120</p>
          </div>
          <div className='p-4 bg-white rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Usuarios Registrados
            </h2>
            <p className='text-2xl font-bold text-blue-900'>45</p>
          </div>
          <div className='p-4 bg-white rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Productos Activos
            </h2>
            <p className='text-2xl font-bold text-blue-900'>30</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AdminView
