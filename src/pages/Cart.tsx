import React, { useState, useEffect } from 'react';

// Util para obtener el userId del localStorage
function getUserId() {
  return localStorage.getItem("userId") || "";
}

// Tipos de datos
interface CartItem {
  _id: string;
  nombre: string;
  precioBase: number;
  imagenURL: string;
  quantity: number;
}

interface Direccion {
  _id: string;
  calle: string;
  numero: string;
  comuna: string;
  departamento?: string;
  predeterminado?: boolean;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const localCart = localStorage.getItem("cart");
    try {
      return localCart ? JSON.parse(localCart) : [];
    } catch {
      return [];
    }
  });

  const [direcciones, setDirecciones] = useState<Direccion[]>([]);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState<string>("");
  const [metodoPago, setMetodoPago] = useState<string>("Webpay");
  const [costoDespacho, setCostoDespacho] = useState<number>(2000);
  const [loading, setLoading] = useState(false);
  const [showWebpay, setShowWebpay] = useState(false);

  const userId = getUserId();

  // Solo lee el carrito UNA VEZ al montar
  useEffect(() => {
    const localCart = localStorage.getItem("cart");
    if (localCart) {
      try {
        setCartItems(JSON.parse(localCart));
      } catch (e) {
        alert("¡Error leyendo el carrito! Vacía el cart manualmente.");
        console.error("Error parseando el carrito:", e, localCart);
      }
    }
  }, []);

  // Guarda el carrito cada vez que cambie (evita race condition)
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Sincroniza entre pestañas y cuando otro componente (como el modal) actualiza el cart
  useEffect(() => {
    const updateCart = () => {
      const localCart = localStorage.getItem("cart");
      setCartItems(localCart ? JSON.parse(localCart) : []);
    };
    window.addEventListener("cart-updated", updateCart);
    window.addEventListener("storage", updateCart);
    return () => {
      window.removeEventListener("cart-updated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  // Direcciones al montar/cambiar usuario
  useEffect(() => {
    if (!userId) {
      setDirecciones([]);
      setDireccionSeleccionada("");
      return;
    }
    fetch(`http://localhost:3000/usuarios/direcciones?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        setDirecciones(data);
        if (data.length > 0) {
          const pred = data.find((d: Direccion) => d.predeterminado) || data[0];
          setDireccionSeleccionada(pred._id);
        }
      })
      .catch(() => setDirecciones([]));
  }, [userId]);

  // -------- FUNCIONES DE CARRITO --------
  const handleIncrement = (_id: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (_id: string) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === _id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDelete = (_id: string) => {
    setCartItems(prev => prev.filter(item => item._id !== _id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.precioBase * item.quantity,
    0
  );

  // Checkout SOLO se ejecuta cuando aprueba el pago simulado
  const handleCheckout = async () => {
    if (!userId) {
      alert("Debes iniciar sesión.");
      return;
    }
    if (!direccionSeleccionada) {
      alert("Selecciona una dirección de envío.");
      return;
    }
    if (cartItems.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    setLoading(true);
    const pedido = {
      usuario_id: userId,
      direccionEnvio_id: direccionSeleccionada,
      metodoPago,
      costoDespacho,
      items: cartItems.map(item => ({
        productoId: item._id,
        cantidad: item.quantity
      }))
    };
    try {
      const res = await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });
      const data = await res.json();
      if (res.ok) {
        alert("¡Pedido realizado correctamente! ID: " + data.pedidoId);
        setCartItems([]);
        localStorage.removeItem("cart");
      } else {
        alert("Error: " + (data.message || "Error al crear pedido."));
      }
    } catch (e: any) {
      alert("Error de red: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  // --- SIMULACION WEBPAY ---
  if (showWebpay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-xs">
          <h2 className="text-xl font-bold mb-4 text-blue-900">Webpay (Simulado)</h2>
          <p className="mb-6">Esta es una simulación de pago Webpay.<br />¿Deseas aprobar el pago?</p>
          <div className="flex gap-4 justify-center">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold"
              onClick={async () => {
                setLoading(true);
                setShowWebpay(false); // Oculta el modal
                await handleCheckout();
                setLoading(false);
              }}
              disabled={loading}
            >
              Aprobar pago
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold"
              onClick={() => setShowWebpay(false)}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER PRINCIPAL ---
  return (
    <div className="bg-gray-100 p-5 rounded-lg max-w-md mx-auto relative w-11/12 mt-4">
      <h2 className="text-3xl font-bold mb-5 text-center">Carrito</h2>
      {/* Lista del carrito */}
      <div className="flex flex-col gap-4">
        {cartItems.length === 0 && (
          <p className="text-center text-gray-500">Tu carrito está vacío.</p>
        )}
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between p-5 bg-white rounded-lg shadow flex-wrap gap-2"
          >
            <img
              src={item.imagenURL}
              alt={item.nombre}
              className="w-16 h-16 object-contain rounded-md mr-3"
            />
            <div className="flex-1 min-w-[120px]">
              <p className="text-base font-bold">{item.nombre}</p>
              <p className="text-sm text-gray-600">
                ${item.precioBase.toLocaleString("es-CL")}
              </p>
            </div>
            <div className="flex items-center bg-blue-400 rounded-full text-white">
              <button
                className="rounded-md px-2 font-bold"
                onClick={() => handleDecrement(item._id)}
              >
                -
              </button>
              <p className="w-6 text-center">{item.quantity}</p>
              <button
                className="rounded-md px-2 font-bold"
                onClick={() => handleIncrement(item._id)}
              >
                +
              </button>
            </div>
            <button
              className="text-white bg-red-400 rounded-md px-2 py-1"
              onClick={() => handleDelete(item._id)}
            >
              🗑
            </button>
          </div>
        ))}
      </div>
      {/* Selección de dirección y método de pago */}
      <div className="mt-4">
        <label className="block font-semibold mb-1">Dirección de envío:</label>
        <select
          className="w-full p-2 rounded border"
          value={direccionSeleccionada}
          onChange={(e) => setDireccionSeleccionada(e.target.value)}
        >
          <option value="">Selecciona una dirección...</option>
          {direcciones.map((dir) => (
            <option key={dir._id} value={dir._id}>
              {dir.calle} {dir.numero}
              {dir.departamento ? `, Depto ${dir.departamento}` : ""} - {dir.comuna}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-3">
        <label className="block font-semibold mb-1">Método de pago:</label>
        <select
          className="w-full p-2 rounded border"
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
        >
          <option value="Webpay">Webpay</option>
        </select>
      </div>
      <div className="mt-3 flex justify-between">
        <span className="font-semibold">Costo despacho:</span>
        <span>${costoDespacho.toLocaleString("es-CL")}</span>
      </div>
      {/* Subtotal y botón para pagar */}
      <div className="mt-4 flex flex-col items-end">
        <p className="text-lg font-semibold mb-2">
          Subtotal: ${subtotal.toLocaleString("es-CL")}
        </p>
        <button
          className="px-4 py-2 bg-blue-900 text-white rounded-lg text-base w-full"
          onClick={() => setShowWebpay(true)}
          disabled={loading || cartItems.length === 0}
        >
          {loading ? "Enviando pedido..." : "Ir a pagar"}
        </button>
      </div>
    </div>
  );
};

export default Cart;

