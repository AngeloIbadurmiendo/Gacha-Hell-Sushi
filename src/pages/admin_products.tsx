import React, { useState } from "react";

const AdminProducts: React.FC = () => {
  const [materials, setMaterials] = useState([
    { id: 1, name: "Arroz", quantity: 50, unit: "kg" },
    { id: 2, name: "Salmón", quantity: 20, unit: "kg" },
    { id: 3, name: "Alga Nori", quantity: 100, unit: "hojas" },
    { id: 4, name: "Aguacate", quantity: 30, unit: "unidades" },
    { id: 5, name: "Salsa de Soya", quantity: 10, unit: "litros" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"add" | "edit" | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [newMaterial, setNewMaterial] = useState({ name: "", quantity: 0, unit: "" });

  // Función para abrir el modal de agregar ingrediente
  const handleAddIngredient = () => {
    setModalType("add");
    setNewMaterial({ name: "", quantity: 0, unit: "" });
    setShowModal(true);
  };

  // Función para abrir el modal de editar ingrediente
  const handleModifyQuantity = (material: any) => {
    setModalType("edit");
    setSelectedMaterial(material);
    setShowModal(true);
  };

  // Función para guardar un nuevo ingrediente
  const handleSaveNewIngredient = () => {
    const newId = materials.length + 1;
    setMaterials([...materials, { id: newId, ...newMaterial }]);
    setShowModal(false);
  };

  // Función para guardar los cambios en un ingrediente existente
  const handleSaveEditIngredient = () => {
    setMaterials(
      materials.map((material) =>
        material.id === selectedMaterial.id ? { ...selectedMaterial } : material
      )
    );
    setShowModal(false);
  };

  // Función para quitar un ingrediente
  const handleRemoveIngredient = (id: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas quitar este ingrediente?");
    if (confirmDelete) {
      setMaterials(materials.filter((material) => material.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      <h1 className="text-3xl font-bold mb-4">Inventario de ingredientes</h1>
      <div className="mb-4 flex gap-4">
        <button
          onClick={handleAddIngredient}
          className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-600"
        >
          Agregar Ingrediente
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="hidden md:block">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">ID</th>
                <th className="px-4 py-2 border-b">Ingrediente</th>
                <th className="px-4 py-2 border-b">Cantidad</th>
                <th className="px-4 py-2 border-b">Unidad</th>
                <th className="px-2 py-1 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.id} className="hover:bg-gray-400">
                  <td className="px-4 py-2 border-b text-center">{material.id}</td>
                  <td className="px-4 py-2 border-b">{material.name}</td>
                  <td className="px-4 py-2 border-b text-center">{material.quantity}</td>
                  <td className="px-4 py-2 border-b text-center">{material.unit}</td>
                  <td className="px-4 py-2 border-b text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleModifyQuantity(material)}
                        className="p-1 text-white bg-green-700 hover:bg-green-800 text-sm rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleRemoveIngredient(material.id)}
                        className="p-1 text-white bg-red-700 hover:bg-red-800 text-sm rounded"
                      >
                        Quitar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="block md:hidden">
          {materials.map((material) => (
            <div
              key={material.id}
              className="mb-4 p-4 bg-white border border-gray-200 rounded shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
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
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleModifyQuantity(material)}
                  className="p-1 text-white bg-green-700 hover:bg-green-800 text-sm rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleRemoveIngredient(material.id)}
                  className="p-1 text-white bg-red-700 hover:bg-red-800 text-sm rounded"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            {modalType === "add" && (
              <>
                <h2 className="text-xl font-bold mb-4">Agregar Ingrediente</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    value={newMaterial.name}
                    onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                    className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                  <input
                    type="number"
                    value={newMaterial.quantity}
                    onChange={(e) => setNewMaterial({ ...newMaterial, quantity: +e.target.value })}
                    className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                  <input
                    type="text"
                    value={newMaterial.unit}
                    onChange={(e) => setNewMaterial({ ...newMaterial, unit: e.target.value })}
                    className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveNewIngredient}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                  >
                    Guardar
                  </button>
                </div>
              </>
            )}
            {modalType === "edit" && (
              <>
                <h2 className="text-xl font-bold mb-4">Editar Ingrediente</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                  <input
                    type="number"
                    value={selectedMaterial.quantity}
                    onChange={(e) =>
                      setSelectedMaterial({ ...selectedMaterial, quantity: +e.target.value })
                    }
                    className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveEditIngredient}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                  >
                    Guardar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Botón Volver */}
      <div className="sticky bottom-0 bg-gray-100 p-4">
        <button
          onClick={() => (window.location.href = "/admin")}
          className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-600 w-full md:w-auto"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default AdminProducts;
