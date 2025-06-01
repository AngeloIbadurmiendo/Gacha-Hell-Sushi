const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // Aunque ahora no se usa para autenticación, se deja por si lo reactivas
const jwt = require('jsonwebtoken'); // Igual que bcrypt

const app = express();
const port = 3000;
const jwtSecret = 'tu_secreto_super_seguro'; // Ya no es tan importante sin autenticación

app.use(bodyParser.json());

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

// --- Productos ---
app.get('/productos', async (req, res) => { /* ... */ });
app.get('/productos/:productoId', async (req, res) => { /* ... */ });
app.get('/productos/categoria/:categoriaId', async (req, res) => { /* ... */ });
app.post('/productos', async (req, res) => { /* ... (ahora accesible sin admin) */ });
app.put('/productos/:productoId', async (req, res) => { /* ... (ahora accesible sin admin) */ });
app.delete('/productos/:productoId', async (req, res) => { /* ... (ahora accesible sin admin) */ });

// --- Categorías ---
app.get('/categorias', async (req, res) => { /* ... */ });
app.get('/categorias/:categoriaId', async (req, res) => { /* ... */ });
app.post('/categorias', async (req, res) => { /* ... (ahora accesible sin admin) */ });
app.put('/categorias/:categoriaId', async (req, res) => { /* ... (ahora accesible sin admin) */ });
app.delete('/categorias/:categoriaId', async (req, res) => { /* ... (ahora accesible sin admin) */ });

// --- Usuarios ---
app.post('/usuarios/registro', async (req, res) => { /* ... */ });
app.post('/usuarios/login', async (req, res) => { /* ... */ });
app.get('/usuarios/perfil', async (req, res) => { /* ... (ya no requiere autenticación) */ });
app.put('/usuarios/perfil', async (req, res) => { /* ... (ya no requiere autenticación) */ });
app.post('/usuarios/logout', async (req, res) => { /* ... (ya no requiere autenticación) */ });

// --- Direcciones ---
app.get('/usuarios/direcciones', async (req, res) => { /* ... (ya no requiere autenticación) */ });
app.get('/usuarios/direcciones/:direccionId', async (req, res) => { /* ... (ya no requiere autenticación) */ });
app.post('/usuarios/direcciones', async (req, res) => { /* ... (ya no requiere autenticación) */ });
app.put('/usuarios/direcciones/:direccionId', async (req, res) => { /* ... (ya no requiere autenticación) */ });
app.delete('/usuarios/direcciones/:direccionId', async (req, res) => { /* ... (ya no requiere autenticación) */ });

// --- Pedidos ---
app.post('/pedidos', async (req, res) => { /* ... (ya no requiere autenticación) */ });
app.get('/pedidos', async (req, res) => { /* ... (ya no requiere autenticación) */ });
app.get('/pedidos/:pedidoId', async (req, res) => { /* ... (ya no requiere autenticación) */ });
app.put('/pedidos/:pedidoId', async (req, res) => { /* ... (ya no requiere autenticación admin) */ });
app.post('/pedidos/:pedidoId/anular', async (req, res) => { /* ... */ });

// --- Despachos ---
app.get('/despachos/:despachoId', async (req, res) => { /* ... (ya no requiere autenticación admin/repartidor) */ });
app.put('/despachos/:despachoId', async (req, res) => { /* ... (ya no requiere autenticación admin/repartidor) */ });

// --- Ingredientes ---
app.get('/ingredientes', async (req, res) => { /* ... (ya no requiere autenticación admin) */ });
app.get('/ingredientes/:ingredienteId', async (req, res) => { /* ... (ya no requiere autenticación admin) */ });
app.post('/ingredientes', async (req, res) => { /* ... (ahora accesible sin admin) */ });
app.put('/ingredientes/:ingredienteId', async (req, res) => { /* ... (ahora accesible sin admin) */ });
app.delete('/ingredientes/:ingredienteId', async (req, res) => { /* ... (ahora accesible sin admin) */ });

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});