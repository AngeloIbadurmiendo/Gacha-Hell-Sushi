import React from "react"

const AdminProducts: React.FC = () => {
  const materials = [
    { id: 1, name: "Arroz", quantity: 50, unit: "kg" },
    { id: 2, name: "Salmón", quantity: 20, unit: "kg" },
    { id: 3, name: "Alga Nori", quantity: 100, unit: "hojas" },
    { id: 4, name: "Aguacate", quantity: 30, unit: "unidades" },
    { id: 5, name: "Salsa de Soya", quantity: 10, unit: "litros" },
  ]

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Inventario de ingredientes</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead>
            <tr>
              <th className='px-4 py-2 border-b'>ID</th>
              <th className='px-4 py-2 border-b'>ingrediente</th>
              <th className='px-4 py-2 border-b'>Cantidad</th>
              <th className='px-4 py-2 border-b'>Unidad</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.id} className='hover:bg-gray-100'>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminProducts
