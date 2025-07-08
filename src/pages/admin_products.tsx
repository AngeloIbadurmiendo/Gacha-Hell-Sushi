import React, { useState, useEffect } from "react"

interface Product {
  _id: string
  nombre: string
  precioBase: number
  descuento: number
  disponibilidad: number
  descripcion?: string
  imagenURL?: string
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [showModal, setShowModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    nombre: "",
    precioBase: 0,
    descuento: 0,
    disponibilidad: 0,
    descripcion: "",
    imagenURL: "",
    categoria_id: null, // Cambiado a null por default
  })

  // Obtener productos desde la base de datos
  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]))
  }, [])

  // Guardar nuevo producto en la base de datos
  const handleSaveNewProduct = async () => {
    try {
      const res = await fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      })
      if (res.ok) {
        setShowModal(false)
        setNewProduct({
          nombre: "",
          precioBase: 0,
          descuento: 0,
          disponibilidad: 0,
          descripcion: "",
          imagenURL: "",
          categoria_id: null,
        })
        // Refresca la lista
        const updated = await fetch("http://localhost:3000/productos").then(
          (r) => r.json()
        )
        setProducts(updated)
      } else {
        alert("Error al agregar producto")
      }
    } catch {
      alert("Error al agregar producto")
    }
  }

  // Eliminar producto
  const handleRemoveProduct = async (id: string) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    )
    if (confirmDelete) {
      await fetch(`http://localhost:3000/productos/${id}`, { method: "DELETE" })
      setProducts(products.filter((p) => p._id !== id))
    }
  }

  return (
    <div className='p-6 bg-gray-100 min-h-screen relative'>
      <h1 className='text-3xl font-bold mb-4'>Productos</h1>
      <div className='mb-4 flex gap-4'>
        <button
          onClick={() => setShowModal(true)}
          className='px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600'
        >
          Agregar Producto
        </button>
      </div>
      <div className='overflow-x-auto'>
        <div className='hidden md:block'>
          <table className='min-w-full bg-white border border-gray-200'>
            <thead>
              <tr>
                {/* <th className='px-4 py-2 border-b'>ID</th> */}
                <th className='px-4 py-2 border-b'>Nombre</th>
                <th className='px-4 py-2 border-b'>Precio</th>
                <th className='px-4 py-2 border-b'>Descuento (%)</th>
                <th className='px-4 py-2 border-b'>Disponibilidad</th>
                <th className='px-4 py-2 border-b'>Descripción</th>
                <th className='px-4 py-2 border-b'>Imagen</th>
                <th className='px-2 py-1 border-b'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className='hover:bg-gray-400'>
                  {/* <td className='px-4 py-2 border-b text-center'>{product._id}</td> */}
                  <td className='px-4 py-2 border-b'>{product.nombre}</td>
                  <td className='px-4 py-2 border-b text-center'>
                    ${product.precioBase}
                  </td>
                  <td className='px-4 py-2 border-b text-center'>
                    {product.descuento}
                  </td>
                  <td className='px-4 py-2 border-b text-center'>
                    {product.disponibilidad}
                  </td>
                  <td className='px-4 py-2 border-b'>{product.descripcion}</td>
                  <td className='px-4 py-2 border-b'>
                    {product.imagenURL && (
                      <img
                        src={product.imagenURL}
                        alt={product.nombre}
                        className='w-16 h-16 object-cover'
                      />
                    )}
                  </td>
                  <td className='px-4 py-2 border-b text-center'>
                    <button
                      onClick={() => handleRemoveProduct(product._id)}
                      className='p-1 text-white bg-red-700 hover:bg-red-800 text-sm rounded'
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Vista móvil */}
        <div className='block md:hidden'>
          {products.map((product) => (
            <div
              key={product._id}
              className='mb-4 p-4 bg-white border border-gray-200 rounded shadow-[0_4px_6px_rgba(0,0,0,0.5)]'
            >
              {/* <p>
        <strong>ID:</strong> {product._id}
      </p> */}
              <p>
                <strong>Nombre:</strong> {product.nombre}
              </p>
              <p>
                <strong>Precio:</strong> ${product.precioBase}
              </p>
              <p>
                <strong>Descuento:</strong> {product.descuento}%
              </p>
              <p>
                <strong>Disponibilidad:</strong> {product.disponibilidad}
              </p>
              <p>
                <strong>Descripción:</strong> {product.descripcion}
              </p>
              {product.imagenURL && (
                <img
                  src={product.imagenURL}
                  alt={product.nombre}
                  className='w-16 h-16 object-cover'
                />
              )}
              <div className='mt-2 flex gap-2'>
                <button
                  onClick={() => handleRemoveProduct(product._id)}
                  className='p-1 text-white bg-red-700 hover:bg-red-800 text-sm rounded'
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal para agregar producto */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
            <h2 className='text-xl font-bold mb-4'>Agregar Producto</h2>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Nombre
              </label>
              <input
                type='text'
                value={newProduct.nombre}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, nombre: e.target.value })
                }
                className='p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Precio Base
              </label>
              <input
                type='number'
                value={newProduct.precioBase === 0 ? "" : newProduct.precioBase}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, precioBase: +e.target.value })
                }
                className='p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='0'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Descuento (%)
              </label>
              <input
                type='number'
                value={newProduct.descuento === 0 ? "" : newProduct.descuento}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, descuento: +e.target.value })
                }
                className='p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='0'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Disponibilidad
              </label>
              <input
                type='number'
                value={
                  newProduct.disponibilidad === 0
                    ? ""
                    : newProduct.disponibilidad
                }
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    disponibilidad: +e.target.value,
                  })
                }
                className='p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='0'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Descripción
              </label>
              <input
                type='text'
                value={newProduct.descripcion}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, descripcion: e.target.value })
                }
                className='p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Imagen URL
              </label>
              <input
                type='text'
                value={newProduct.imagenURL}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, imagenURL: e.target.value })
                }
                className='p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
            {/* Si usas categorías, puedes agregar un input para categoria_id aquí */}
            <div className='flex justify-end gap-4'>
              <button
                onClick={() => setShowModal(false)}
                className='bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none'
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveNewProduct}
                className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none'
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón Volver */}
      <div className='sticky bottom-0 bg-gray-100 p-4'>
        <button
          onClick={() => (window.location.href = "/admin")}
          className='bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600 w-full md:w-auto'
        >
          Volver
        </button>
      </div>
    </div>
  )
}

export default AdminProducts
