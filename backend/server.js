const express = require("express")
const cors = require("cors") // <--- agrega aquí

const { MongoClient, ObjectId } = require("mongodb")
const bodyParser = require("body-parser")

const app = express() // <--- primero inicializa la app
const port = 3000

app.use(cors())

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(bodyParser.json())

const uri = "mongodb://localhost:27017/gacha-hell-sushi" // Asegúrate que tu MongoDB esté corriendo y la DB exista
const client = new MongoClient(uri)

async function connectToMongo() {
  try {
    await client.connect()
    console.log("Conectado a MongoDB")
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error)
    process.exit(1) // Sale de la aplicación si no puede conectar a la DB
  }
}

connectToMongo() // Llama a la función para conectar a la DB al iniciar el servidor

// --- Productos ---

// GET /productos
app.get("/productos", async (req, res) => {
  try {
    const productosCollection = client.db().collection("productos")
    const productos = await productosCollection.find({}).toArray()
    res.status(200).json(productos)
  } catch (error) {
    console.error("Error al obtener productos:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener productos" })
  }
})

// GET /productos/:productoId
app.get("/productos/:productoId", async (req, res) => {
  try {
    const productoId = req.params.productoId
    if (!ObjectId.isValid(productoId)) {
      return res.status(400).json({ message: "ID de producto inválido" })
    }
    const productosCollection = client.db().collection("productos")
    const producto = await productosCollection.findOne({
      _id: new ObjectId(productoId),
    })

    if (producto) {
      res.status(200).json(producto)
    } else {
      res.status(404).json({ message: "Producto no encontrado" })
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener el producto" })
  }
})

// GET /productos/categoria/:categoriaId
app.get("/productos/categoria/:categoriaId", async (req, res) => {
  try {
    const categoriaId = req.params.categoriaId
    if (!ObjectId.isValid(categoriaId)) {
      return res.status(400).json({ message: "ID de categoría inválido" })
    }
    const productosCollection = client.db().collection("productos")
    const productos = await productosCollection
      .find({ categoria_id: new ObjectId(categoriaId) })
      .toArray()
    res.status(200).json(productos)
  } catch (error) {
    console.error("Error al obtener productos por categoría:", error)
    res.status(500).json({
      message: "Error interno del servidor al obtener productos por categoría",
    })
  }
})

// POST /productos
app.post("/productos", async (req, res) => {
  try {
    const {
      nombre,
      imagenURL,
      precioBase,
      descuento,
      disponibilidad,
      descripcion,
      categoria_id,
    } = req.body
    if (!nombre || precioBase === undefined || !categoria_id) {
      return res.status(400).json({
        message: "Faltan campos obligatorios: nombre, precioBase, categoria_id",
      })
    }
    if (!ObjectId.isValid(categoria_id)) {
      return res.status(400).json({ message: "ID de categoría inválido" })
    }

    const productosCollection = client.db().collection("productos")
    const newProduct = {
      nombre,
      imagenURL: imagenURL || "",
      precioBase: Number(precioBase),
      descuento: Number(descuento) || 0,
      disponibilidad: Number(disponibilidad) || 0,
      descripcion: descripcion || "",
      categoria_id: new ObjectId(categoria_id),
    }

    const result = await productosCollection.insertOne(newProduct)
    res.status(201).json({
      message: "Producto creado exitosamente",
      productId: result.insertedId,
    })
  } catch (error) {
    console.error("Error al crear el producto:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al crear el producto" })
  }
})

// PUT /productos/:productoId
app.put("/productos/:productoId", async (req, res) => {
  try {
    const productoId = req.params.productoId
    if (!ObjectId.isValid(productoId)) {
      return res.status(400).json({ message: "ID de producto inválido" })
    }

    const updates = req.body
    const updateDoc = {}

    // Convertir tipos de datos si es necesario y filtrar campos no actualizables
    if (updates.nombre !== undefined) updateDoc.nombre = updates.nombre
    if (updates.imagenURL !== undefined) updateDoc.imagenURL = updates.imagenURL
    if (updates.precioBase !== undefined)
      updateDoc.precioBase = Number(updates.precioBase)
    if (updates.descuento !== undefined)
      updateDoc.descuento = Number(updates.descuento)
    if (updates.disponibilidad !== undefined)
      updateDoc.disponibilidad = Number(updates.disponibilidad)
    if (updates.descripcion !== undefined)
      updateDoc.descripcion = updates.descripcion
    if (updates.categoria_id !== undefined) {
      if (!ObjectId.isValid(updates.categoria_id)) {
        return res
          .status(400)
          .json({ message: "ID de categoría inválido en la actualización" })
      }
      updateDoc.categoria_id = new ObjectId(updates.categoria_id)
    }

    if (Object.keys(updateDoc).length === 0) {
      return res.status(400).json({
        message: "No se proporcionaron campos válidos para actualizar",
      })
    }

    const productosCollection = client.db().collection("productos")
    const result = await productosCollection.updateOne(
      { _id: new ObjectId(productoId) },
      { $set: updateDoc }
    )

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado para actualizar" })
    }
    res.status(200).json({ message: "Producto actualizado exitosamente" })
  } catch (error) {
    console.error("Error al actualizar el producto:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al actualizar el producto" })
  }
})

// DELETE /productos/:productoId
app.delete("/productos/:productoId", async (req, res) => {
  try {
    const productoId = req.params.productoId
    if (!ObjectId.isValid(productoId)) {
      return res.status(400).json({ message: "ID de producto inválido" })
    }
    const productosCollection = client.db().collection("productos")
    const result = await productosCollection.deleteOne({
      _id: new ObjectId(productoId),
    })

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado para eliminar" })
    }
    res.status(200).json({ message: "Producto eliminado exitosamente" })
  } catch (error) {
    console.error("Error al eliminar el producto:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al eliminar el producto" })
  }
})

// --- Categorías ---

// GET /categorias
app.get("/categorias", async (req, res) => {
  try {
    const categoriasCollection = client.db().collection("categorias")
    const categorias = await categoriasCollection.find({}).toArray()
    res.status(200).json(categorias)
  } catch (error) {
    console.error("Error al obtener categorías:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener categorías" })
  }
})

// GET /categorias/:categoriaId
app.get("/categorias/:categoriaId", async (req, res) => {
  try {
    const categoriaId = req.params.categoriaId
    if (!ObjectId.isValid(categoriaId)) {
      return res.status(400).json({ message: "ID de categoría inválido" })
    }
    const categoriasCollection = client.db().collection("categorias")
    const categoria = await categoriasCollection.findOne({
      _id: new ObjectId(categoriaId),
    })

    if (categoria) {
      res.status(200).json(categoria)
    } else {
      res.status(404).json({ message: "Categoría no encontrada" })
    }
  } catch (error) {
    console.error("Error al obtener la categoría:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener la categoría" })
  }
})

// POST /categorias
app.post("/categorias", async (req, res) => {
  try {
    const { categoria, descripcion } = req.body
    if (!categoria) {
      return res
        .status(400)
        .json({ message: 'El campo "categoria" es obligatorio' })
    }
    const categoriasCollection = client.db().collection("categorias")
    const newCategory = {
      categoria,
      descripcion: descripcion || "",
    }
    const result = await categoriasCollection.insertOne(newCategory)
    res.status(201).json({
      message: "Categoría creada exitosamente",
      categoriaId: result.insertedId,
    })
  } catch (error) {
    console.error("Error al crear la categoría:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al crear la categoría" })
  }
})

// PUT /categorias/:categoriaId
app.put("/categorias/:categoriaId", async (req, res) => {
  try {
    const categoriaId = req.params.categoriaId
    if (!ObjectId.isValid(categoriaId)) {
      return res.status(400).json({ message: "ID de categoría inválido" })
    }
    const updates = req.body
    const updateDoc = {}
    if (updates.categoria !== undefined) updateDoc.categoria = updates.categoria
    if (updates.descripcion !== undefined)
      updateDoc.descripcion = updates.descripcion

    if (Object.keys(updateDoc).length === 0) {
      return res.status(400).json({
        message: "No se proporcionaron campos válidos para actualizar",
      })
    }

    const categoriasCollection = client.db().collection("categorias")
    const result = await categoriasCollection.updateOne(
      { _id: new ObjectId(categoriaId) },
      { $set: updateDoc }
    )
    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Categoría no encontrada para actualizar" })
    }
    res.status(200).json({ message: "Categoría actualizada exitosamente" })
  } catch (error) {
    console.error("Error al actualizar la categoría:", error)
    res.status(500).json({
      message: "Error interno del servidor al actualizar la categoría",
    })
  }
})

// DELETE /categorias/:categoriaId
app.delete("/categorias/:categoriaId", async (req, res) => {
  try {
    const categoriaId = req.params.categoriaId
    if (!ObjectId.isValid(categoriaId)) {
      return res.status(400).json({ message: "ID de categoría inválido" })
    }
    const categoriasCollection = client.db().collection("categorias")
    const result = await categoriasCollection.deleteOne({
      _id: new ObjectId(categoriaId),
    })
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Categoría no encontrada para eliminar" })
    }
    res.status(200).json({ message: "Categoría eliminada exitosamente" })
  } catch (error) {
    console.error("Error al eliminar la categoría:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al eliminar la categoría" })
  }
})

// --- Usuarios ---

// POST /usuarios/registro
app.post("/usuarios/registro", async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      nombreUsuario,
      correo,
      contrasenia,
      numeroTelefonico,
    } = req.body
    if (!nombre || !correo || !contrasenia) {
      return res.status(400).json({
        message: "Faltan campos obligatorios: nombre, correo, contrasenia",
      })
    }

    const usuariosCollection = client.db().collection("usuarios")
    const existingUser = await usuariosCollection.findOne({ correo })
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" })
    }

    // En una app real, aquí se hashearía la contraseña con bcrypt
    const newUser = {
      nombre,
      apellido: apellido || "",
      nombreUsuario: nombreUsuario || "",
      correo,
      contrasenia: contrasenia, // Contraseña sin hashear (NO SEGURO PARA PRODUCCIÓN)
      numeroTelefonico: numeroTelefonico || "",
      fechaRegistro: new Date(),
    }
    const result = await usuariosCollection.insertOne(newUser)
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      userId: result.insertedId,
    })
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al registrar el usuario" })
  }
})

// POST /usuarios/login (Funcionalidad básica, sin JWT)
app.post("/usuarios/login", async (req, res) => {
  try {
    const { correo, contrasenia } = req.body
    if (!correo || !contrasenia) {
      return res
        .status(400)
        .json({ message: "Faltan campos obligatorios: correo, contrasenia" })
    }

    const usuariosCollection = client.db().collection("usuarios")
    const user = await usuariosCollection.findOne({ correo })

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" })
    }

    // En una app real, se compararía la contraseña hasheada
    if (contrasenia === user.contrasenia) {
      // Comparación directa (NO SEGURO PARA PRODUCCIÓN)
      // Aquí se generaría un JWT en un sistema real
      res
        .status(200)
        .json({ message: "Inicio de sesión exitoso", userId: user._id })
    } else {
      res.status(401).json({ message: "Credenciales inválidas" })
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al iniciar sesión" })
  }
})

// GET /usuarios/perfil (Asume que el ID de usuario se pasa como query param o se hardcodea para prueba)
app.get("/usuarios/perfil", async (req, res) => {
  try {
    const userId = req.query.userId // Espera userId como ?userId=...
    if (!userId || !ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "ID de usuario inválido o no proporcionado" })
    }
    const usuariosCollection = client.db().collection("usuarios")
    const user = await usuariosCollection.findOne({ _id: new ObjectId(userId) })
    if (user) {
      const { contrasenia, ...userWithoutPassword } = user // Excluye la contraseña
      res.status(200).json(userWithoutPassword)
    } else {
      res.status(404).json({ message: "Usuario no encontrado" })
    }
  } catch (error) {
    console.error("Error al obtener perfil:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener el perfil" })
  }
})

// PUT /usuarios/perfil (Asume que el ID de usuario se pasa como query param)
app.put("/usuarios/perfil", async (req, res) => {
  try {
    const userId = req.query.userId // Espera userId como ?userId=...
    if (!userId || !ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "ID de usuario inválido o no proporcionado" })
    }
    const updates = req.body
    const updateDoc = {}

    if (updates.nombre !== undefined) updateDoc.nombre = updates.nombre
    if (updates.apellido !== undefined) updateDoc.apellido = updates.apellido
    if (updates.nombreUsuario !== undefined)
      updateDoc.nombreUsuario = updates.nombreUsuario
    if (updates.correo !== undefined) updateDoc.correo = updates.correo
    // La contraseña no se actualizaría directamente aquí sin validación de la antigua
    if (updates.numeroTelefonico !== undefined)
      updateDoc.numeroTelefonico = updates.numeroTelefonico
    if (updates.imagenURL !== undefined) updateDoc.imagenURL = updates.imagenURL // Si tuvieras una imagen de perfil

    if (Object.keys(updateDoc).length === 0) {
      return res.status(400).json({
        message: "No se proporcionaron campos válidos para actualizar",
      })
    }

    const usuariosCollection = client.db().collection("usuarios")
    const result = await usuariosCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateDoc }
    )

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado para actualizar" })
    }
    res
      .status(200)
      .json({ message: "Perfil de usuario actualizado exitosamente" })
  } catch (error) {
    console.error("Error al actualizar perfil:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al actualizar el perfil" })
  }
})

// GET /usuarios (Lista de usuarios - solo para admin, no implementado aquí)
app.get("/usuarios", async (req, res) => {
  try {
    const usuariosCollection = client.db().collection("usuarios")
    const usuarios = await usuariosCollection.find({}).toArray()
    res.status(200).json(usuarios)
  } catch (error) {
    console.error("Error al obtener usuarios:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener usuarios" })
  }
})

// POST /usuarios/logout (No hace nada significativo sin JWT, solo mensaje)
app.post("/usuarios/logout", async (req, res) => {
  res
    .status(200)
    .json({ message: "Sesión cerrada (operación simulada sin JWT)" })
})

// --- Direcciones ---

// GET /usuarios/direcciones (Asume que el ID de usuario se pasa como query param)
app.get("/usuarios/direcciones", async (req, res) => {
  try {
    const userId = req.query.userId // Espera userId como ?userId=...
    if (!userId || !ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "ID de usuario inválido o no proporcionado" })
    }
    const direccionesCollection = client.db().collection("direcciones")
    const direcciones = await direccionesCollection
      .find({ usuario_id: new ObjectId(userId) })
      .toArray()
    res.status(200).json(direcciones)
  } catch (error) {
    console.error("Error al obtener direcciones:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener direcciones" })
  }
})

// GET /usuarios/direcciones/:direccionId (Asume que el ID de usuario se pasa como query param)
app.get("/usuarios/direcciones/:direccionId", async (req, res) => {
  try {
    const direccionId = req.params.direccionId
    const userId = req.query.userId // Espera userId como ?userId=...
    if (
      !ObjectId.isValid(direccionId) ||
      !userId ||
      !ObjectId.isValid(userId)
    ) {
      return res
        .status(400)
        .json({ message: "ID de dirección o usuario inválido" })
    }
    const direccionesCollection = client.db().collection("direcciones")
    const direccion = await direccionesCollection.findOne({
      _id: new ObjectId(direccionId),
      usuario_id: new ObjectId(userId),
    })

    if (direccion) {
      res.status(200).json(direccion)
    } else {
      res
        .status(404)
        .json({ message: "Dirección no encontrada o no pertenece al usuario" })
    }
  } catch (error) {
    console.error("Error al obtener la dirección:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener la dirección" })
  }
})

// POST /usuarios/direcciones (Asume que el ID de usuario se pasa en el body)
app.post("/usuarios/direcciones", async (req, res) => {
  try {
    const { usuario_id, calle, numero, departamento, comuna, predeterminado } =
      req.body
    if (
      !usuario_id ||
      !ObjectId.isValid(usuario_id) ||
      !calle ||
      !numero ||
      !comuna
    ) {
      return res.status(400).json({
        message:
          "Faltan campos obligatorios o ID de usuario inválido: usuario_id, calle, numero, comuna",
      })
    }
    const direccionesCollection = client.db().collection("direcciones")
    const newDireccion = {
      usuario_id: new ObjectId(usuario_id),
      calle,
      numero: String(numero), // Guardar como string por si incluye letras (ej. "123-A")
      departamento: departamento || "",
      comuna,
      predeterminado: predeterminado || false,
      fechaCreacion: new Date(),
    }
    const result = await direccionesCollection.insertOne(newDireccion)
    res.status(201).json({
      message: "Dirección agregada exitosamente",
      direccionId: result.insertedId,
    })
  } catch (error) {
    console.error("Error al agregar dirección:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al agregar la dirección" })
  }
})

// PUT /usuarios/direcciones/:direccionId (Asume que el ID de usuario se pasa en el body)
app.put("/usuarios/direcciones/:direccionId", async (req, res) => {
  try {
    const direccionId = req.params.direccionId
    const { usuario_id, calle, numero, departamento, comuna, predeterminado } =
      req.body
    if (
      !ObjectId.isValid(direccionId) ||
      !usuario_id ||
      !ObjectId.isValid(usuario_id)
    ) {
      return res
        .status(400)
        .json({ message: "ID de dirección o usuario inválido" })
    }

    const updates = req.body
    const updateDoc = {}
    if (updates.calle !== undefined) updateDoc.calle = updates.calle
    if (updates.numero !== undefined) updateDoc.numero = String(updates.numero)
    if (updates.departamento !== undefined)
      updateDoc.departamento = updates.departamento
    if (updates.comuna !== undefined) updateDoc.comuna = updates.comuna
    if (updates.predeterminado !== undefined)
      updateDoc.predeterminado = updates.predeterminado

    if (Object.keys(updateDoc).length === 0) {
      return res.status(400).json({
        message: "No se proporcionaron campos válidos para actualizar",
      })
    }

    const direccionesCollection = client.db().collection("direcciones")
    const result = await direccionesCollection.updateOne(
      { _id: new ObjectId(direccionId), usuario_id: new ObjectId(usuario_id) },
      { $set: updateDoc }
    )

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Dirección no encontrada o no pertenece al usuario" })
    }
    res.status(200).json({ message: "Dirección actualizada exitosamente" })
  } catch (error) {
    console.error("Error al actualizar dirección:", error)
    res.status(500).json({
      message: "Error interno del servidor al actualizar la dirección",
    })
  }
})

// DELETE /usuarios/direcciones/:direccionId (Asume que el ID de usuario se pasa en el body)
app.delete("/usuarios/direcciones/:direccionId", async (req, res) => {
  try {
    const direccionId = req.params.direccionId
    const { usuario_id } = req.body // Se necesita usuario_id para verificar propiedad
    if (
      !ObjectId.isValid(direccionId) ||
      !usuario_id ||
      !ObjectId.isValid(usuario_id)
    ) {
      return res
        .status(400)
        .json({ message: "ID de dirección o usuario inválido" })
    }

    const direccionesCollection = client.db().collection("direcciones")
    const result = await direccionesCollection.deleteOne({
      _id: new ObjectId(direccionId),
      usuario_id: new ObjectId(usuario_id),
    })

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message:
          "Dirección no encontrada o no pertenece al usuario para eliminar",
      })
    }
    res.status(200).json({ message: "Dirección eliminada exitosamente" })
  } catch (error) {
    console.error("Error al eliminar dirección:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al eliminar la dirección" })
  }
})

// --- Pedidos ---

// POST /pedidos (Asume que el ID de usuario se pasa en el body)
app.post("/pedidos", async (req, res) => {
  try {
    const { usuario_id, direccionEnvio_id, metodoPago, costoDespacho, items } =
      req.body
    if (
      !usuario_id ||
      !ObjectId.isValid(usuario_id) ||
      !direccionEnvio_id ||
      !ObjectId.isValid(direccionEnvio_id) ||
      !metodoPago ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Faltan campos obligatorios o datos inválidos para el pedido",
      })
    }

    const pedidosCollection = client.db().collection("pedidos")
    const itemsPedidoCollection = client.db().collection("items_pedido")
    const productosCollection = client.db().collection("productos")

    let subtotalPedido = 0
    const itemsParaInsertar = []
    const productoIds = items.map((item) => new ObjectId(item.productoId))

    // Obtener todos los productos de una vez para optimizar
    const productosEnPedido = await productosCollection
      .find({ _id: { $in: productoIds } })
      .toArray()
    const productosMap = new Map(
      productosEnPedido.map((p) => [p._id.toString(), p])
    )

    for (const item of items) {
      if (
        !ObjectId.isValid(item.productoId) ||
        !item.cantidad ||
        item.cantidad <= 0
      ) {
        return res
          .status(400)
          .json({ message: "Ítem de pedido inválido: productoId o cantidad" })
      }
      const producto = productosMap.get(item.productoId)
      if (!producto) {
        return res
          .status(404)
          .json({ message: `Producto con ID ${item.productoId} no encontrado` })
      }

      const precioUnitario =
        producto.precioBase -
        producto.precioBase * (producto.descuento / 100 || 0)
      const precioItem = precioUnitario * item.cantidad
      subtotalPedido += precioItem

      itemsParaInsertar.push({
        producto_id: new ObjectId(item.productoId),
        cantidad: Number(item.cantidad),
        precioUnitario: precioUnitario,
        nombreProducto: producto.nombre, // Opcional: guardar nombre para referencia rápida
      })
    }

    const nuevoPedido = {
      usuario_id: new ObjectId(usuario_id),
      direccionEnvio_id: new ObjectId(direccionEnvio_id),
      metodoPago,
      estado: "Pendiente", // Estado inicial
      fechaHora: new Date(),
      subtotal: subtotalPedido,
      costoDespacho: Number(costoDespacho) || 0,
      precioTotal: subtotalPedido + (Number(costoDespacho) || 0),
      motivoAnulacion: null,
      despacho_id: null,
      items: itemsParaInsertar, // Incrustar items directamente en el pedido
    }

    const resultPedido = await pedidosCollection.insertOne(nuevoPedido)
    res.status(201).json({
      message: "Pedido creado exitosamente",
      pedidoId: resultPedido.insertedId,
    })
  } catch (error) {
    console.error("Error al crear el pedido:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al crear el pedido" })
  }
})

// GET /pedidos (Obtener pedidos de un usuario específico - requiere usuario_id)
app.get("/pedidos", async (req, res) => {
  try {
    const userId = req.query.userId // Espera userId como ?userId=...
    if (!userId || !ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "ID de usuario inválido o no proporcionado" })
    }
    const pedidosCollection = client.db().collection("pedidos")
    const pedidos = await pedidosCollection
      .find({ usuario_id: new ObjectId(userId) })
      .toArray()
    res.status(200).json(pedidos)
  } catch (error) {
    console.error("Error al obtener pedidos:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener los pedidos" })
  }
})

// GET /pedidos/:pedidoId (Obtener un pedido específico - requiere usuario_id para verificación)
app.get("/pedidos/:pedidoId", async (req, res) => {
  try {
    const pedidoId = req.params.pedidoId
    const userId = req.query.userId // Espera userId como ?userId=...
    if (!ObjectId.isValid(pedidoId) || !userId || !ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ message: "ID de pedido o usuario inválido" })
    }

    const pedidosCollection = client.db().collection("pedidos")
    const pedido = await pedidosCollection.findOne({
      _id: new ObjectId(pedidoId),
      usuario_id: new ObjectId(userId),
    })

    if (pedido) {
      res.status(200).json(pedido)
    } else {
      res
        .status(404)
        .json({ message: "Pedido no encontrado o no pertenece al usuario" })
    }
  } catch (error) {
    console.error("Error al obtener el pedido:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener el pedido" })
  }
})

// GET /pedidos_admin
app.get("/pedidos_admin", async (req, res) => {
  try {
    const pedidosCollection = client.db().collection("pedidos")
    const usuariosCollection = client.db().collection("usuarios")

    // Aggregate para traer el correo del usuario
    const pedidos = await pedidosCollection
      .aggregate([
        {
          $lookup: {
            from: "usuarios",
            localField: "usuario_id",
            foreignField: "_id",
            as: "usuario",
          },
        },
        {
          $unwind: "$usuario",
        },
        {
          $addFields: {
            correoUsuario: "$usuario.correo",
          },
        },
        {
          $project: {
            usuario: 0, // No enviar el objeto usuario completo
          },
        },
      ])
      .toArray()

    res.status(200).json(pedidos)
  } catch (error) {
    console.error("Error al obtener pedidos (admin):", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener los pedidos" })
  }
})

// PUT /pedidos/:pedidoId (Actualizar estado del pedido - sin admin check)
app.put("/pedidos/:pedidoId", async (req, res) => {
  try {
    const pedidoId = req.params.pedidoId
    if (!ObjectId.isValid(pedidoId)) {
      return res.status(400).json({ message: "ID de pedido inválido" })
    }

    const updates = req.body
    const updateDoc = {}

    if (updates.estado !== undefined) updateDoc.estado = updates.estado
    if (updates.despacho_id !== undefined) {
      if (
        updates.despacho_id !== null &&
        !ObjectId.isValid(updates.despacho_id)
      ) {
        return res.status(400).json({ message: "ID de despacho inválido" })
      }
      updateDoc.despacho_id = updates.despacho_id
        ? new ObjectId(updates.despacho_id)
        : null
    }
    // Puedes añadir más campos a actualizar aquí (ej. costoDespacho, metodoPago, etc.)

    if (Object.keys(updateDoc).length === 0) {
      return res.status(400).json({
        message: "No se proporcionaron campos válidos para actualizar",
      })
    }

    const pedidosCollection = client.db().collection("pedidos")
    const result = await pedidosCollection.updateOne(
      { _id: new ObjectId(pedidoId) },
      { $set: updateDoc }
    )

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Pedido no encontrado para actualizar" })
    }
    res.status(200).json({ message: "Pedido actualizado exitosamente" })
  } catch (error) {
    console.error("Error al actualizar el pedido:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al actualizar el pedido" })
  }
})

// POST /pedidos/:pedidoId/anular
app.post("/pedidos/:pedidoId/anular", async (req, res) => {
  try {
    const pedidoId = req.params.pedidoId
    const { motivoAnulacion } = req.body
    if (!ObjectId.isValid(pedidoId)) {
      return res.status(400).json({ message: "ID de pedido inválido" })
    }
    if (!motivoAnulacion) {
      return res
        .status(400)
        .json({ message: "Se requiere un motivo de anulación" })
    }

    const pedidosCollection = client.db().collection("pedidos")
    const result = await pedidosCollection.updateOne(
      { _id: new ObjectId(pedidoId) },
      {
        $set: {
          estado: "Anulado",
          motivoAnulacion: motivoAnulacion,
          fechaAnulacion: new Date(),
        },
      }
    )

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Pedido no encontrado para anular" })
    }
    res.status(200).json({ message: "Pedido anulado exitosamente" })
  } catch (error) {
    console.error("Error al anular el pedido:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al anular el pedido" })
  }
})

// --- Despachos ---

// GET /despachos/:despachoId
app.get("/despachos/:despachoId", async (req, res) => {
  try {
    const despachoId = req.params.despachoId
    if (!ObjectId.isValid(despachoId)) {
      return res.status(400).json({ message: "ID de despacho inválido" })
    }
    const despachosCollection = client.db().collection("despachos")
    const despacho = await despachosCollection.findOne({
      _id: new ObjectId(despachoId),
    })

    if (despacho) {
      res.status(200).json(despacho)
    } else {
      res.status(404).json({ message: "Despacho no encontrado" })
    }
  } catch (error) {
    console.error("Error al obtener el despacho:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener el despacho" })
  }
})

// PUT /despachos/:despachoId
app.put("/despachos/:despachoId", async (req, res) => {
  try {
    const despachoId = req.params.despachoId
    if (!ObjectId.isValid(despachoId)) {
      return res.status(400).json({ message: "ID de despacho inválido" })
    }

    const updates = req.body
    const updateDoc = {}
    if (updates.estado !== undefined) updateDoc.estado = updates.estado
    if (updates.detallesSeguimiento !== undefined)
      updateDoc.detallesSeguimiento = updates.detallesSeguimiento
    // Aquí podrías añadir campos como 'repartidor_id', 'fechaEntrega', etc.

    if (Object.keys(updateDoc).length === 0) {
      return res.status(400).json({
        message: "No se proporcionaron campos válidos para actualizar",
      })
    }

    const despachosCollection = client.db().collection("despachos")
    const result = await despachosCollection.updateOne(
      { _id: new ObjectId(despachoId) },
      { $set: updateDoc }
    )

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Despacho no encontrado para actualizar" })
    }
    res.status(200).json({ message: "Despacho actualizado exitosamente" })
  } catch (error) {
    console.error("Error al actualizar el despacho:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al actualizar el despacho" })
  }
})

// --- Ingredientes ---

// GET /ingredientes
app.get("/ingredientes", async (req, res) => {
  try {
    const ingredientesCollection = client.db().collection("ingredientes")
    const ingredientes = await ingredientesCollection.find({}).toArray()
    res.status(200).json(ingredientes)
  } catch (error) {
    console.error("Error al obtener ingredientes:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener ingredientes" })
  }
})

// GET /ingredientes/:ingredienteId
app.get("/ingredientes/:ingredienteId", async (req, res) => {
  try {
    const ingredienteId = req.params.ingredienteId
    if (!ObjectId.isValid(ingredienteId)) {
      return res.status(400).json({ message: "ID de ingrediente inválido" })
    }
    const ingredientesCollection = client.db().collection("ingredientes")
    const ingrediente = await ingredientesCollection.findOne({
      _id: new ObjectId(ingredienteId),
    })

    if (ingrediente) {
      res.status(200).json(ingrediente)
    } else {
      res.status(404).json({ message: "Ingrediente no encontrado" })
    }
  } catch (error) {
    console.error("Error al obtener el ingrediente:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al obtener el ingrediente" })
  }
})

// POST /ingredientes
app.post("/ingredientes", async (req, res) => {
  try {
    const { nombre, cantidad, unidad } = req.body
    if (!nombre || cantidad === undefined || !unidad) {
      return res.status(400).json({
        message: "Faltan campos obligatorios: nombre, cantidad, unidad",
      })
    }
    const ingredientesCollection = client.db().collection("ingredientes")
    const newIngrediente = {
      nombre,
      cantidad: Number(cantidad),
      unidad,
    }
    const result = await ingredientesCollection.insertOne(newIngrediente)
    res.status(201).json({
      message: "Ingrediente creado exitosamente",
      ingredienteId: result.insertedId,
    })
  } catch (error) {
    console.error("Error al crear el ingrediente:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al crear el ingrediente" })
  }
})

// PUT /ingredientes/:ingredienteId
app.put("/ingredientes/:ingredienteId", async (req, res) => {
  try {
    const ingredienteId = req.params.ingredienteId
    if (!ObjectId.isValid(ingredienteId)) {
      return res.status(400).json({ message: "ID de ingrediente inválido" })
    }

    const updates = req.body
    const updateDoc = {}
    if (updates.nombre !== undefined) updateDoc.nombre = updates.nombre
    if (updates.cantidad !== undefined)
      updateDoc.cantidad = Number(updates.cantidad)
    if (updates.unidad !== undefined) updateDoc.unidad = updates.unidad

    if (Object.keys(updateDoc).length === 0) {
      return res.status(400).json({
        message: "No se proporcionaron campos válidos para actualizar",
      })
    }

    const ingredientesCollection = client.db().collection("ingredientes")
    const result = await ingredientesCollection.updateOne(
      { _id: new ObjectId(ingredienteId) },
      { $set: updateDoc }
    )

    if (result.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Ingrediente no encontrado para actualizar" })
    }
    res.status(200).json({ message: "Ingrediente actualizado exitosamente" })
  } catch (error) {
    console.error("Error al actualizar el ingrediente:", error)
    res.status(500).json({
      message: "Error interno del servidor al actualizar el ingrediente",
    })
  }
})

// DELETE /ingredientes/:ingredienteId
app.delete("/ingredientes/:ingredienteId", async (req, res) => {
  try {
    const ingredienteId = req.params.ingredienteId
    if (!ObjectId.isValid(ingredienteId)) {
      return res.status(400).json({ message: "ID de ingrediente inválido" })
    }
    const ingredientesCollection = client.db().collection("ingredientes")
    const result = await ingredientesCollection.deleteOne({
      _id: new ObjectId(ingredienteId),
    })

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Ingrediente no encontrado para eliminar" })
    }
    res.status(200).json({ message: "Ingrediente eliminado exitosamente" })
  } catch (error) {
    console.error("Error al eliminar el ingrediente:", error)
    res.status(500).json({
      message: "Error interno del servidor al eliminar el ingrediente",
    })
  }
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})

// Admins
// POST /usuarios_admin/registro
app.post("/usuarios_admin/registro", async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      nombreUsuario,
      correo,
      contrasenia,
      numeroTelefonico,
    } = req.body
    if (!nombre || !correo || !contrasenia) {
      return res.status(400).json({
        message: "Faltan campos obligatorios: nombre, correo, contrasenia",
      })
    }

    const usuariosCollection = client.db().collection("usuarios_admin")
    const existingUser = await usuariosCollection.findOne({ correo })
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" })
    }

    // En una app real, aquí se hashearía la contraseña con bcrypt
    const newUser = {
      nombre,
      apellido: apellido || "",
      nombreUsuario: nombreUsuario || "",
      correo,
      contrasenia: contrasenia, // Contraseña sin hashear (NO SEGURO PARA PRODUCCIÓN)
      numeroTelefonico: numeroTelefonico || "",
      fechaRegistro: new Date(),
    }
    const result = await usuariosCollection.insertOne(newUser)
    res.status(201).json({
      message: "Usuario registrado exitosamente",
      userId: result.insertedId,
    })
  } catch (error) {
    console.error("Error al registrar usuario:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al registrar el usuario" })
  }
})

// POST /usuarios_admin/login (Funcionalidad básica, sin JWT)
app.post("/usuarios_admin/login", async (req, res) => {
  try {
    const { correo, contrasenia } = req.body
    if (!correo || !contrasenia) {
      return res
        .status(400)
        .json({ message: "Faltan campos obligatorios: correo, contrasenia" })
    }

    const usuariosCollection = client.db().collection("usuarios_admin")
    const user = await usuariosCollection.findOne({ correo })

    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" })
    }

    // En una app real, se compararía la contraseña hasheada
    if (contrasenia === user.contrasenia) {
      // Comparación directa (NO SEGURO PARA PRODUCCIÓN)
      // Aquí se generaría un JWT en un sistema real
      res
        .status(200)
        .json({ message: "Inicio de sesión exitoso", userId: user._id })
    } else {
      res.status(401).json({ message: "Credenciales inválidas" })
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error)
    res
      .status(500)
      .json({ message: "Error interno del servidor al iniciar sesión" })
  }
})
