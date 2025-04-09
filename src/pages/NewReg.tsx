const Signup =() => {
    return (
      <div className='flex flex-col items-center p-6 bg-gray-400 rounded-lg max-w-md mx-auto mt-6 shadow-md'>
          <div className="bg-green-200 grid grid-cols-4 gap-4 w-full">
              <div className="bg-blue-200 p-4 col-span-3 flex justify-start text-left">
                  <h1>Registra tu cuenta</h1>
              </div>
              <button className="p-4 col-span-1">
                  <h1>X</h1>
              </button>
          </div>
          <div className="mt-6 mb-6 w-full">
              <input
                type="text"
                placeholder="Nombre"
                className="bg-white border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>
          <div className="mb-6 w-full">
              <input
                type="text"
                placeholder="Apellido"
                className="bg-white border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
          </div>
          <div className="mb-6 w-full">
              <input
                type="text"
                placeholder="Correo electonico"
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
          <div className="mb-4 flex items-center space-x-2">
            <div>
                <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-500 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <h1>Acepto los terminos y condiciones de uso</h1>
            </div>
          </div>
          <button className="bg-blue-200 border border-black p-3 rounded-full w-3/4 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <h1>registrarse</h1>
          </button>
      </div>
    )
  }
  
  export default Signup