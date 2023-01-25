//librerías necesarias
const express = require("express");
const { Router } = express;

//conexión con base de datos
const { iniciarServidorFirebase, connectDB } = require('./config.js')

//implementación de servidor
const app = express();
const productos = express.Router();
const carrito = express.Router();
const usuarios = express.Router();
const PORT = process.env.PORT || 8080;
const iniciarServidor = async () => {
  try {
    iniciarServidorFirebase()
    connectDB().then(console.log("MongoDb se encuentra conectado"));
    const server = app.listen(PORT, () => {
      console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
    });
    server.on("error", (error) => console.log(`Error en servidor ${error}`));
  } catch (error) {
    console.log(error)
  }
}

iniciarServidor()

//Separación de rutas requeridas
const prod = require("./routes/productos.js")
const usr = require("./routes/usuarios.js")
const cart = require("./routes/carrito.js")

//app.use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productos);
app.use("/api/carrito", carrito);
app.use("/api/usuarios", usuarios);
app.use(express.static("public"));

//productos
productos.get("/", prod.listAll);

productos.get("/:id", prod.listById);

productos.post("/", prod.createProduct);

productos.put("/:id", prod.modifyProduct);

productos.delete("/:id", prod.deleteProduct);

//usuarios
usuarios.get("/", usr.listAll);

usuarios.get("/:id", usr.listById);

usuarios.post("/", usr.createUser);

usuarios.put("/:id", usr.modifyUser);

usuarios.delete("/:id", usr.deleteUser);

usuarios.post('/login', usr.login)

//carrito
carrito.get("/", cart.listAll);

carrito.get("/:id/productos", cart.listById);

carrito.post("/", cart.createCart);

carrito.post("/:id/productos", cart.addProduct);

carrito.delete("/:id", cart.deleteCart);

carrito.delete("/:id/productos/:id_prod", cart.removeProductById);

//default
app.get("*", (req, res) => {
  res.status(404).send({ error: "Error 404, ruta no encontrada" });
});