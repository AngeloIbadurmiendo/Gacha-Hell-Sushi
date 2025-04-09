const Login =() => {
  return (
    <div className='flex flex-col items-center p-6 bg-gray-400 rounded-lg max-w-md mx-auto mt-6 shadow-md'>
        <div className="bg-green-200 grid grid-cols-4 gap-4 w-full">
            <div className="bg-blue-200 p-4 col-span-3 flex justify-start text-left">
                <h1>Inicia Sesion</h1>
            </div>
            <button className="p-4 col-span-1">
                <h1>X</h1>
            </button>
        </div>
        <div className="mt-6 mb-6 w-full">
            <input
              type="text"
              placeholder="Usuario"
              className="bg-white border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="mb-6 w-full">
            <input
              type="password"
              placeholder="Contraseña"
              className="bg-white border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <button className="mb-2 bg-blue-800 p-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            <h1>Iniciar Sesion</h1>
        </button>
        <button className="bg-blue-200 border border-black p-3 rounded-full w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <h1>registrarse</h1>
        </button>
    </div>
  )
}

export default Login