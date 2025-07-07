import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Address {
  _id: string;         // Usar string porque MongoDB usa ObjectId
  calle: string;
  numero: string;
  comuna: string;
  departamento?: string;
  predeterminado: boolean;
}

const Directions: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const userId = localStorage.getItem("userId"); // Reemplazar por el real o tomarlo de contexto/autenticación

  useEffect(() => {
    // GET direcciones del usuario desde el servidor
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/usuarios/direcciones?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener direcciones");
        }
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddresses();
  }, [userId]);

  const handleModify = (id: string) => {
    alert(`Modificar dirección con ID: ${id}`);
    // Aquí puedes redirigir a una vista con formulario y luego hacer PUT
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar esta dirección?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/usuarios/direcciones/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ usuario_id: userId }),
          }
        );
        if (response.ok) {
          setAddresses(addresses.filter((address) => address._id !== id));
        } else {
          console.error("Error al eliminar dirección");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-gray-100 p-5 rounded-lg max-w-md mx-auto relative w-11/12">
      <Link
        to="/perfil"
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        aria-label="Cerrar"
      >
        &times;
      </Link>

      <h2 className="text-3xl font-bold mb-5 text-center">Tus direcciones</h2>
      <div className="flex flex-col gap-4">
        {addresses.map((address) => (
          <div
            key={address._id}
            className="flex justify-between items-center p-8 bg-white rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.5)] flex-wrap"
          >
            <div className="flex flex-col flex-1 min-w-[150px]">
              <p className="text-base font-bold">
                {address.calle} #{address.numero}
              </p>
              {address.departamento && (
                <p className="text-sm text-gray-600">
                  Depto: {address.departamento}
                </p>
              )}
              <p className="text-sm text-gray-600">{address.comuna}</p>
              {address.predeterminado && (
                <p className="text-sm text-blue-500 italic">
                  Dirección predeterminada
                </p>
              )}
            </div>
            <div className="flex gap-2 mt-2 justify-center flex-1">
              <button
                className="px-3 py-1 bg-blue-400 text-white rounded-lg text-sm"
                onClick={() => handleModify(address._id)}
              >
                Modificar
              </button>
              <button
                className="px-3 py-1 bg-red-400 text-white rounded-lg text-sm"
                onClick={() => handleDelete(address._id)}
              >
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/modifydir"
        className="mt-8 py-2 bg-blue-900 text-white rounded-full text-base w-1/2 mx-auto block text-center"
      >
        Añadir una dirección
      </Link>
    </div>
  );
};

export default Directions;

