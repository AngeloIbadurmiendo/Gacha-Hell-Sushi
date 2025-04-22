import React, { useState } from "react"

// TODO: Agregar estilos correctos

interface Address {
  id: number
  street: string
  city: string
  isDefault: boolean
}

const Directions: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, street: "Av España 1680", city: "Valparaíso", isDefault: true },
    { id: 2, street: "Av Borgoño 680", city: "Viña del Mar", isDefault: false },
  ])

  const handleModify = (id: number) => {
    alert(`Modificar dirección con ID: ${id}`)
    // Aquí puedes redirigir a la página de modificación o abrir un modal
  }

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar esta dirección?"
    )
    if (confirmDelete) {
      setAddresses(addresses.filter((address) => address.id !== id))
    }
  }

  const handleAdd = () => {
    window.location.href = "/modifydir"
  }

  return (
    <div className='bg-gray-100 p-5 rounded-lg max-w-md mx-auto relative w-11/12'>
      <h2 className='text-3xl font-bold mb-5 text-center'>Tus direcciones</h2>
      <div className='flex flex-col gap-4'>
        {addresses.map((address) => (
          <div
            key={address.id}
            className='flex justify-between items-center p-8 bg-white rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.5)] flex-wrap'
          >
            <div className='flex flex-col flex-1 min-w-[150px]'>
              <p className='text-base font-bold'>{address.street}</p>
              <p className='text-sm text-gray-600'>{address.city}</p>
              {address.isDefault && (
                <p className='text-sm text-blue-500 italic'>
                  Dirección predeterminada
                </p>
              )}
            </div>
            <div className='flex gap-2 mt-2 justify-center flex-1'>
              <button
                className='px-3 py-1 bg-blue-400 text-white rounded-lg text-sm'
                onClick={() => handleModify(address.id)}
              >
                Modificar
              </button>
              <button
                className='px-3 py-1 bg-red-600 text-white rounded-lg text-sm'
                onClick={() => handleDelete(address.id)}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className='mt-8 py-2 bg-blue-900 text-white rounded-full text-base w-1/2 mx-auto block'
        onClick={handleAdd}
      >
        Añadir una dirección
      </button>
    </div>
  )
}

export default Directions
