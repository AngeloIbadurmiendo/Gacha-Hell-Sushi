const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = 3000;

// Reemplaza con tu cadena de conexión a MongoDB
const uri = 'mongodb://localhost:27017/mi_tienda_online';
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
}

connect();

// Ruta para obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const productosCollection = client.db().collection('productos');
    const productos = await productosCollection.find().toArray();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});