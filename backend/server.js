const express = require("express")
const { MongoClient, ObjectId } = require("mongodb")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt") 
const jwt = require("jsonwebtoken") 

const app = express()
const port = 3000
const jwtSecret = "tu_secreto_super_seguro" 

app.use(bodyParser.json())

const uri = "mongodb://localhost:27017/mi_tienda_online"
const client = new MongoClient(uri)

async function connect() {
  try {
    await client.connect()
    console.log("Conectado a MongoDB")
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error)
  }
}

connect()

// --- Productos ---
app.get("/productos", async (req, res) => {
  try {
    const db = client.db()
    const productos = await db.collection("productos").find().toArray()
    res.json(productos)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" })
  }
})
app.get("/productos/:productoId", async (req, res) => {
  try {
    const db = client.db()
    const productoId = new ObjectId(req.params.productoId)
    const producto = await db
      .collection("productos")
      .findOne({ _id: productoId })
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json(producto)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" })
  }
})
app.get("/productos/categoria/:categoriaId", async (req, res) => {
  try {
    const db = client.db()
    const categoriaId = new ObjectId(req.params.categoriaId)
    const productos = await db
      .collection("productos")
      .find({ categoriaId })
      .toArray()
    res.json(productos)
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los productos por categoría" })
  }
})
app.post("/productos", async (req, res) => {
  const { nombre, descripcion, precio, categoriaId } = req.body
  if (!nombre || !descripcion || !precio || !categoriaId) {
    return res.status(400).json({ error: "Faltan datos del producto" })
  }
  try {
    const db = client.db()
    const nuevoProducto = {
      nombre,
      descripcion,
      precio,
      categoriaId: new ObjectId(categoriaId),
    }
    const result = await db.collection("productos").insertOne(nuevoProducto)
    res.status(201).json({ _id: result.insertedId, ...nuevoProducto })
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" })
  }
})
app.put("/productos/:productoId", async (req, res) => {
  const { nombre, descripcion, precio, categoriaId } = req.body
  if (!nombre || !descripcion || !precio || !categoriaId) {
    return res.status(400).json({ error: "Faltan datos del producto" })
  }
  try {
    const db = client.db()
    const productoId = new ObjectId(req.params.productoId)
    const updatedProducto = {
      nombre,
      descripcion,
      precio,
      categoriaId: new ObjectId(categoriaId),
    }
    const result = await db
      .collection("productos")
      .updateOne({ _id: productoId }, { $set: updatedProducto })
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json({ _id: productoId, ...updatedProducto })
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" })
  }
})
app.delete("/productos/:productoId", async (req, res) => {
  try {
    const db = client.db()
    const productoId = new ObjectId(req.params.productoId)
    const result = await db
      .collection("productos")
      .deleteOne({ _id: productoId })
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json({ message: "Producto eliminado" })
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" })
  }
})

// --- Categorías ---
app.get("/categorias", async (req, res) => {
  try {
    const db = client.db()
    const categorias = await db.collection("categorias").find().toArray()
    res.json(categorias)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías" })
  }
})
app.get("/categorias/:categoriaId", async (req, res) => {
  try {
    const db = client.db()
    const categoriaId = new ObjectId(req.params.categoriaId)
    const categoria = await db
      .collection("categorias")
      .findOne({ _id: categoriaId })
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" })
    }
    res.json(categoria)
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la categoría" })
  }
})
app.post("/categorias", async (req, res) => {
  const { nombre } = req.body
  if (!nombre) {
    return res.status(400).json({ error: "Falta el nombre de la categoría" })
  }
  try {
    const db = client.db()
    const nuevaCategoria = { nombre }
    const result = await db.collection("categorias").insertOne(nuevaCategoria)
    res.status(201).json({ _id: result.insertedId, ...nuevaCategoria })
  } catch (error) {
    res.status(500).json({ error: "Error al crear la categoría" })
  }
})
app.put("/categorias/:categoriaId", async (req, res) => {
  const { nombre } = req.body
  if (!nombre) {
    return res.status(400).json({ error: "Falta el nombre de la categoría" })
  }
  try {
    const db = client.db()
    const categoriaId = new ObjectId(req.params.categoriaId)
    const updatedCategoria = { nombre }
    const result = await db
      .collection("categorias")
      .updateOne({ _id: categoriaId }, { $set: updatedCategoria })
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" })
    }
    res.json({ _id: categoriaId, ...updatedCategoria })
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la categoría" })
  }
})

// --- Usuarios ---
app.post("/usuarios/registro", async (req, res) => {
  const { nombre, email, password } = req.body
  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Faltan datos del usuario" })
  }
  try {
    const db = client.db()
    const nuevoUsuario = { nombre, email, password } 
    const result = await db.collection("usuarios").insertOne(nuevoUsuario)
    res.status(201).json({ _id: result.insertedId, ...nuevoUsuario })
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" })
  }
})
app.post("/usuarios/login", async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ error: "Faltan datos de inicio de sesión" })
  }
  try {
    const db = client.db()
    const usuario = await db.collection("usuarios").findOne({ email })
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" })
    }
 
    const token = jwt.sign({ userId: usuario._id }, jwtSecret, {
      expiresIn: "1h",
    })
    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" })
  }
})
app.get("/usuarios/perfil", async (req, res) => {
  
})
app.put("/usuarios/perfil", async (req, res) => {
  
})
app.post("/usuarios/logout", async (req, res) => {
  
})

// --- Direcciones ---
app.get("/usuarios/direcciones", async (req, res) => {

})
app.get("/usuarios/direcciones/:direccionId", async (req, res) => {

})
app.post("/usuarios/direcciones", async (req, res) => {
  
})
app.put("/usuarios/direcciones/:direccionId", async (req, res) => {
  
})
app.delete("/usuarios/direcciones/:direccionId", async (req, res) => {
  
})

// --- Pedidos ---
app.post("/pedidos", async (req, res) => {
  
})
app.get("/pedidos", async (req, res) => {
  
})
app.get("/pedidos/:pedidoId", async (req, res) => {
  
})
app.put("/pedidos/:pedidoId", async (req, res) => {
  
})
app.post("/pedidos/:pedidoId/anular", async (req, res) => {
  
})

// --- Despachos ---
app.get("/despachos/:despachoId", async (req, res) => {
  
})
app.put("/despachos/:despachoId", async (req, res) => {
 
})

// --- Ingredientes ---
app.get("/ingredientes", async (req, res) => {
  
})
app.get("/ingredientes/:ingredienteId", async (req, res) => {
  
})
app.post("/ingredientes", async (req, res) => {
  
})
app.put("/ingredientes/:ingredienteId", async (req, res) => {
  
})
app.delete("/ingredientes/:ingredienteId", async (req, res) => {
 
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})
