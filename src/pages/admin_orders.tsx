import React, { useEffect, useState } from "react"

interface Order {
  _id: string
  usuario_id: string
  estado: string
  precioTotal: number
  items: { nombreProducto: string; cantidad: number }[]
  correoUsuario?: string // Nuevo campo para el correo del usuario
  // Puedes agregar más campos según tu modelo
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3000/pedidos_admin") // Cambia el endpoint si es necesario
      .then((res) => res.json())
      .then((data) => {
        setOrders(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold mb-6'>Pedidos</h1>
      <div className='overflow-x-auto'>
        {loading ? (
          <div className='text-center py-8'>Cargando...</div>
        ) : (
          <>
            <div className='hidden md:block'>
              <table className='min-w-full bg-white rounded-lg'>
                <thead>
                  <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                    <th className='py-3 px-6 text-left'>Usuario</th>
                    <th className='py-3 px-6 text-left'>Items</th>
                    <th className='py-3 px-6 text-left'>Total</th>
                    <th className='py-3 px-6 text-left'>Estado</th>
                  </tr>
                </thead>
                <tbody className='text-gray-600 text-sm font-light'>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className='border-b border-gray-200 hover:bg-gray-100'
                    >
                      <td className='py-3 px-6 text-left'>
                        {order.correoUsuario ?? order.usuario_id}
                      </td>
                      <td className='py-3 px-6 text-left'>
                        {order.items.map((item, idx) => (
                          <span key={idx}>
                            {item.nombreProducto} x{item.cantidad}
                            {idx < order.items.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </td>
                      <td className='py-3 px-6 text-left'>
                        ${order.precioTotal?.toLocaleString() ?? "-"}
                      </td>
                      <td className='py-3 px-6 text-left'>
                        <span
                          className={`py-1 px-3 rounded-full text-xs ${
                            order.estado === "Completado"
                              ? "bg-green-200 text-green-600"
                              : order.estado === "En progreso"
                              ? "bg-yellow-200 text-yellow-600"
                              : "bg-red-200 text-red-600"
                          }`}
                        >
                          {order.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='md:hidden'>
              {orders.map((order) => (
                <div
                  key={order._id}
                  className='bg-white shadow-[0_4px_6px_rgba(0,0,0,0.5)] rounded-lg mb-4 p-4 '
                >
                  <p>
                    <strong>Usuario:</strong>{" "}
                    {order.correoUsuario ?? order.usuario_id}
                  </p>
                  <p>
                    <strong>Items:</strong>{" "}
                    {order.items.map((item, idx) => (
                      <span key={idx}>
                        {item.nombreProducto} x{item.cantidad}
                        {idx < order.items.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                  <p>
                    <strong>Total:</strong> $
                    {order.precioTotal?.toLocaleString() ?? "-"}
                  </p>
                  <p>
                    <strong>Estado:</strong>{" "}
                    <span
                      className={`py-1 px-3 rounded-full text-xs ${
                        order.estado === "Completado"
                          ? "bg-green-200 text-green-600"
                          : order.estado === "En progreso"
                          ? "bg-yellow-200 text-yellow-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {order.estado}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
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

export default AdminOrders
