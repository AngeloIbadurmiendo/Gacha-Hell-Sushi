import React, { useState } from "react"
import { Link } from "react-router-dom" // Importa Link de react-router-dom

const ModifyDir: React.FC = () => {
  const [commune, setCommune] = useState("")
  const [street, setStreet] = useState("")
  const [streetNumber, setStreetNumber] = useState("")
  const [department, setDepartment] = useState("")
  const [isDefault, setIsDefault] = useState(false)

  const handleSave = () => {
    // Guardado de dirección mientras sea solo front end
    console.log({
      commune,
      street,
      streetNumber,
      department,
      isDefault,
    })
    alert("Dirección guardada con éxito")

    window.location.href = "/directions"
  }

  return (
    <div className='bg-gray-100 p-6 rounded-lg max-w-md mx-auto mt-5 shadow-lg relative w-11/12'>
      <h2 className='text-xl font-bold mb-5 text-center'>
        Modifica tu dirección
      </h2>

      {/* Botón "Volver al perfil" como una X */}
      <Link
        to='/directions'
        className='absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700'
        aria-label='Cerrar'
      >
        &times;
      </Link>

      <form
        className='flex flex-col gap-4'
        onSubmit={(e) => {
          e.preventDefault()
          if (!commune || !street || !streetNumber) {
            alert("Por favor, complete todos los campos obligatorios.")
            return
          }
          handleSave()
        }}
      >
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-bold'>Comuna</label>
          <input
            type='text'
            value={commune}
            onChange={(e) => setCommune(e.target.value)}
            className='p-2 border border-gray-300 rounded-md text-base'
            placeholder='Ingrese la comuna'
            required
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-bold'>Calle</label>
          <input
            type='text'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className='p-2 border border-gray-300 rounded-md text-base'
            placeholder='Ingrese la calle'
            required
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-bold'>N° de calle</label>
          <input
            type='text'
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
            className='p-2 border border-gray-300 rounded-md text-base'
            placeholder='Ingrese el número'
            required
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 text-sm font-bold'>Detalles adicionales</label>
          <input
            type='text'
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className='p-2 border border-gray-300 rounded-md text-base'
            placeholder='Ingrese el número de departamento si se vive en uno'
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
          type='submit'
          className='p-2 bg-gray-600 text-white rounded-md text-base hover:bg-gray-700'
        >
          Guardar dirección
        </button>
      </form>
    </div>
  )
}

export default ModifyDir
