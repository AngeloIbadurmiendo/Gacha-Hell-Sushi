export const orders = [
  {
    orderNumber: "4353",
    orderDate: "23/03/2025",
    status: "en curso", // Agrega esta propiedad
    customer: {
      name: "Juan Pérez",
      address: "Av. España 1680",
      city: "Valparaíso",
      country: "Chile",
    },
    items: [
      { name: "Palta Roll", quantity: 1, price: 4990 },
      { name: "Kanikama Roll", quantity: 2, price: 4500 },
    ],
    deliveryFee: 1990,
  },
  {
    orderNumber: "3781",
    orderDate: "23/02/2025",
    status: "completado", // Agrega esta propiedad
    customer: {
      name: "María López",
      address: "Calle 123",
      city: "Santiago",
      country: "Chile",
    },
    items: [
      { name: "Calamari Roll", quantity: 1, price: 5500 },
      { name: "Sake Roll", quantity: 3, price: 6000 },
    ],
    deliveryFee: 2500,
  },
  {
    orderNumber: "1890",
    orderDate: "15/01/2025",
    status: "cancelado", // Agrega esta propiedad
    customer: {
      name: "Carlos Gómez",
      address: "Av. Libertad 456",
      city: "Viña del Mar",
      country: "Chile",
    },
    items: [
      { name: "Ebi Roll", quantity: 1, price: 4500 },
      { name: "Tempura Roll", quantity: 2, price: 5000 },
    ],
    deliveryFee: 0,
  },
];