const AdminUsers = () => {
  const users = [
    {
      id: 1,
      name: "Horst Von Brand",
      email: "horst.vonbrand@usm.cl",
      role: "Usuario",
    },
    {
      id: 2,
      name: "Pedro Godoy",
      email: "pedro.godoy@usm.cl",
      role: "Usuario",
    },
    {
      id: 3,
      name: "Luis Hevia",
      email: "luis.hevia@usm.cl",
      role: "Usuario",
    },
  ]

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Usuarios</h1>
      <div className='overflow-x-auto'>
        <div className='hidden sm:block'>
          <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
            <thead>
              <tr className='bg-gray-100'>
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
                  Rol
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className='border-t border-gray-200'>
                  <td className='px-6 py-4 text-sm text-gray-700'>{user.id}</td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {user.name}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {user.email}
                  </td>
                  <td className='px-6 py-4 text-sm text-gray-700'>
                    {user.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='block sm:hidden'>
          {users.map((user) => (
            <div
              key={user.id}
              className='border border-gray-200 rounded-lg mb-4 p-4 bg-white'
            >
              <p className='text-sm text-gray-700'>
                <span className='font-medium'>ID:</span> {user.id}
              </p>
              <p className='text-sm text-gray-700'>
                <span className='font-medium'>Nombre:</span> {user.name}
              </p>
              <p className='text-sm text-gray-700'>
                <span className='font-medium'>Email:</span> {user.email}
              </p>
              <p className='text-sm text-gray-700'>
                <span className='font-medium'>Rol:</span> {user.role}
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => (window.location.href = "/admin")}
        className='mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full sm:w-auto'
      >
        Volver
      </button>
    </div>
  )
}

export default AdminUsers
