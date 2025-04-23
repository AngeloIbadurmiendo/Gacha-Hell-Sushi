import React from "react"

const AdminProducts: React.FC = () => {
  const materials = [
    { id: 1, name: "Arroz", quantity: 50, unit: "kg" },
    { id: 2, name: "Salmón", quantity: 20, unit: "kg" },
    { id: 3, name: "Alga Nori", quantity: 100, unit: "hojas" },
    { id: 4, name: "Aguacate", quantity: 30, unit: "unidades" },
    { id: 5, name: "Salsa de Soya", quantity: 10, unit: "litros" },
  ]

  const handleAddIngredient = () => {
    alert("Agregar ingrediente")
  }

  const handleModifyQuantity = (id: number) => {
    alert(`Modificar cantidad del ingrediente con ID: ${id}`)
  }

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold mb-4'>Inventario de ingredientes</h1>
      <div className='mb-4 flex gap-4'>
        <button
          onClick={handleAddIngredient}
          className='px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600'
        >
          Agregar Ingrediente
        </button>
      </div>
      <div className='overflow-x-auto'>
        <div className='hidden md:block'>
          <table className='min-w-full bg-white border border-gray-200 '>
            <thead>
              <tr>
                <th className='px-4 py-2 border-b'>ID</th>
                <th className='px-4 py-2 border-b'>Ingrediente</th>
                <th className='px-4 py-2 border-b'>Cantidad</th>
                <th className='px-4 py-2 border-b'>Unidad</th>
                <th className='px-2 py-1 border-b'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.id} className='hover:bg-gray-400'>
                  <td className='px-4 py-2 border-b text-center'>
                    {material.id}
                  </td>
                  <td className='px-4 py-2 border-b'>{material.name}</td>
                  <td className='px-4 py-2 border-b text-center'>
                    {material.quantity}
                  </td>
                  <td className='px-4 py-2 border-b text-center'>
                    {material.unit}
                  </td>
                  <td className='px-4 py-2 border-b text-center'>
                    <div className='flex justify-center items-center gap-2'>
                      <button
                        onClick={() => handleModifyQuantity(material.id)}
                        className='p-1 text-white bg-green-700 hover:bg-green-800 text-sm rounded'
                      >
                        Editar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='block md:hidden'>
          {materials.map((material) => (
            <div
              key={material.id}
              className='mb-4 p-4 bg-white border border-gray-200 rounded shadow-[0_4px_6px_rgba(0,0,0,0.5)]'
            >
              <p>
                <strong>ID:</strong> {material.id}
              </p>
              <p>
                <strong>Ingrediente:</strong> {material.name}
              </p>
              <p>
                <strong>Cantidad:</strong> {material.quantity}
              </p>
              <p>
                <strong>Unidad:</strong> {material.unit}
              </p>
              <div className='mt-2'>
                <button
                  onClick={() => handleModifyQuantity(material.id)}
                  className='p-1 text-white bg-green-700 hover:bg-green-800 text-sm rounded'
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => (window.location.href = "/admin")}
        className='mt-6 bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600 w-full md:w-auto'
      >
        Volver
      </button>
    </div>
  )
}

export default AdminProducts
