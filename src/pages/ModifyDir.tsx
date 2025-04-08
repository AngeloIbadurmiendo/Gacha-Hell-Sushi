import React, { useState } from "react"

// TODO: Agregar estilos correctos

const ModifyDir: React.FC = () => {
  const [region, setRegion] = useState("")
  const [city, setCity] = useState("")
  const [street, setStreet] = useState("")
  const [streetNumber, setStreetNumber] = useState("")
  const [isDefault, setIsDefault] = useState(false)

  const handleSave = () => {
    // Guardado de dirección mientras sea solo front end
    console.log({
      region,
      city,
      street,
      streetNumber,
      isDefault,
    })
    alert("Dirección guardada con éxito")
  }

  return (
    <div className='bg-gray-100 p-6 rounded-lg max-w-md mx-auto mt-5 shadow-lg relative w-11/12'>
      <h2 className='text-xl font-bold mb-5 text-center'>
        Modifica tu dirección
      </h2>
      <button className='absolute top-2 right-2 text-2xl bg-none border-none cursor-pointer'>
        &times;
      </button>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-bold'>Región</label>
          <input
            type='text'
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className='p-2 border border-gray-300 rounded-md text-base'
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-bold'>Ciudad</label>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className='p-2 border border-gray-300 rounded-md text-base'
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-bold'>Calle</label>
          <input
            type='text'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className='p-2 border border-gray-300 rounded-md text-base'
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-bold'>N° de calle</label>
          <input
            type='text'
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
            className='p-2 border border-gray-300 rounded-md text-base'
          />
        </div>
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
            className='w-4 h-4'
          />
          <label className='text-sm'>Hacer predeterminada esta dirección</label>
        </div>
        <button
          type='button'
          onClick={handleSave}
          className='p-2 bg-gray-600 text-white rounded-md text-base hover:bg-gray-700'
        >
          Guardar dirección
        </button>
      </form>
    </div>
  )
}

export default ModifyDir
