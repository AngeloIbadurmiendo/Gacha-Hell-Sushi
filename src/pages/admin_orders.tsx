import React from "react"

const AdminOrders: React.FC = () => {
  const orders = [
    {
      id: 1,
      customer: "Horst Von Brand",
      items: "Sushi Roll",
      total: "$15000",
      status: "Pendiente",
    },
    {
      id: 2,
      customer: "Luis Hevia",
      items: "Tabla Nigiri",
      total: "$12000",
      status: "Completado",
    },
    {
      id: 3,
      customer: "Pedro Godoy",
      items: "Tabla Nagasaki",
      total: "$40000",
      status: "En progreso",
    },
  ]

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold mb-6'>Pedidos</h1>
      <div className='overflow-x-auto'>
        <div className='hidden md:block'>
          <table className='min-w-full bg-white rounded-lg '>
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
                  key={order.id}
                  className='border-b border-gray-200 hover:bg-gray-100'
                >
                  <td className='py-3 px-6 text-left'>{order.customer}</td>
                  <td className='py-3 px-6 text-left'>{order.items}</td>
                  <td className='py-3 px-6 text-left'>{order.total}</td>
                  <td className='py-3 px-6 text-left'>
                    <span
                      className={`py-1 px-3 rounded-full text-xs ${
                        order.status === "Completado"
                          ? "bg-green-200 text-green-600"
                          : order.status === "En progreso"
                          ? "bg-yellow-200 text-yellow-600"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {order.status}
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
              key={order.id}
              className='bg-white shadow-[0_4px_6px_rgba(0,0,0,0.5)] rounded-lg mb-4 p-4 '
            >
              <p>
                <strong>Usuario:</strong> {order.customer}
              </p>
              <p>
                <strong>Items:</strong> {order.items}
              </p>
              <p>
                <strong>Total:</strong> {order.total}
              </p>
              <p>
                <strong>Estado:</strong>{" "}
                <span
                  className={`py-1 px-3 rounded-full text-xs ${
                    order.status === "Completado"
                      ? "bg-green-200 text-green-600"
                      : order.status === "En progreso"
                      ? "bg-yellow-200 text-yellow-600"
                      : "bg-red-200 text-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </p>
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

export default AdminOrders
