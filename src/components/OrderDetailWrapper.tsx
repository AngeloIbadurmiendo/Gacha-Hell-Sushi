import { useNavigate, useParams } from "react-router-dom";
import OrderDetail from "../pages/OrderDetail";
import { orders } from "../data/orders";

const OrderDetailWrapper = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const order = orders.find((o) => o.orderNumber === orderId);

  if (!order) {
    return <div>Pedido no encontrado</div>;
  }

  return (
    <OrderDetail
      {...order}
      onBack={() => navigate("/orders")} // Navega de vuelta a la lista de pedidos
    />
  );
};

export default OrderDetailWrapper;