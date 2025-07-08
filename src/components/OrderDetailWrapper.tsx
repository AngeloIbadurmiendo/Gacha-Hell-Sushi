import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OrderDetail from "../pages/OrderDetail";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Customer {
  name: string;
  address: string;
  city: string;
  country: string;
}

const OrderDetailWrapper: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState<Customer>({
    name: "",
    address: "",
    city: "",
    country: "",
  });

  // Fetch del pedido
  useEffect(() => {
    if (!orderId || !userId) {
      setError("Pedido o usuario no encontrado");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/pedidos/${orderId}?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data._id) {
          setOrder(data);
        } else {
          setError(data.message || "Pedido no encontrado");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Error de conexión con el servidor");
        setLoading(false);
      });
  }, [orderId, userId]);

  // Fetch de la dirección una vez que se obtuvo el pedido
  useEffect(() => {
    if (order && order.direccionEnvio_id && userId) {
      fetch(
        `http://localhost:3000/usuarios/direcciones/${order.direccionEnvio_id}?userId=${userId}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data && data._id) {
            setCustomer({
              name: order.nombreDestinatario || "",
              address: `${data.calle} ${data.numero}${
                data.departamento ? ", Depto " + data.departamento : ""
              }`,
              city: data.comuna,
              country: "Chile",
            });
          }
        })
        .catch(() => {
          // Si falla, no actualiza el customer (queda vacío o el mock)
        });
    }
  }, [order, userId]);

  if (loading) return <div className="p-6 text-center text-gray-400">Cargando...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!order) return null;

  // Adapta los items al formato esperado
  const items: OrderItem[] = order.items.map((item: any) => ({
    name: item.nombreProducto,
    quantity: item.cantidad,
    price: item.precioUnitario,
  }));

  // Mapea estado para OrderDetail
  let status: "completado" | "en curso" | "cancelado";
  switch (order.estado?.toLowerCase()) {
    case "completado":
      status = "completado";
      break;
    case "cancelado":
    case "anulado":
      status = "cancelado";
      break;
    default:
      status = "en curso";
      break;
  }

  return (
    <OrderDetail
      orderNumber={order._id.substring(0, 6)}
      orderDate={new Date(order.fechaHora).toLocaleString()}
      customer={customer}
      items={items}
      deliveryFee={order.costoDespacho}
      status={status}
      onBack={() => navigate("/orders")}
    />
  );
};

export default OrderDetailWrapper;



