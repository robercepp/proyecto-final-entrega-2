//librerías necesarias
const express = require("express");

//conexión con base de datos
const { iniciarServidorFirebase, connectDB } = require('./config.js')

//implementación de servidor
const app = express();
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const usuariosRuta = require('./routes/usuarios.js')
const productosRuta = require('./routes/productos.js')
const carritoRuta = require('./routes/carrito.js')

//app.use
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productosRuta);
app.use("/api/carrito", carritoRuta);
app.use("/api/usuarios", usuariosRuta);

// default
app.get("*", (req, res) => {
  res.status(404).send({ error: "Error 404, ruta no encontrada" });
});