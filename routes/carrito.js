const {mongoCarts, firebaseCarts, filesystemCarts} = require ('../daos/DaoGeneral.js')

//class file system
const Carrito = require("../classes/carrito.js");
const shopCart = new Carrito("./db/carrito.txt");

//carrito
async function listAll(req, res) {
 const resultadoFs = await filesystemCarts.listAll();
 const resultadoFb = await firebaseCarts.listAll();
 const resultado = await mongoCarts.listAll();
  return res.send(resultadoFb);
};

async function listById(req, res) {
 const resultadoFs = await filesystemCarts.listById(req.params.id);
 const resultadoFb = await firebaseCarts.listById(req.params.id);
  const resultado = await mongoCarts.listById(req.params.id);
  return res.send(resultadoFb);
}

async function createCart(req, res) {
  const resultadoFs = await filesystemCarts.createCart();
  const resultadoFb = await firebaseCarts.createCart();
  const resultado = await mongoCarts.createCart();
  return res.send(resultadoFb);
}

async function addProduct(req, res) {
  const resultadoFs = await filesystemCarts.updateCart(req.params.id, req.body.cantidad);
  const resultadoFb = await firebaseCarts.updateCart(req.params.id, req.body.cantidad);
  const resultado = await mongoCarts.updateCart(req.params.id, req.body.cantidad);
  return res.send(resultadoFb);
}

async function deleteCart(req, res) {
  const resultadoFs = await filesystemCarts.removeCart(req.params.id);
  const resultadoFb = await firebaseCarts.removeCart(req.params.id);
  const resultado = await mongoCarts.removeCart(req.params.id);
  return res.send(resultadoFb);
}

async function removeProductById(req, res) {
  const resultadoFs = await filesystemCarts.removeProduct(req.params.id, req.params.id_prod);
  const resultadoFb = await firebaseCarts.removeProduct(req.params.id, req.params.id_prod);
  const resultado = await mongoCarts.removeProduct(req.params.id, req.params.id_prod);
  return res.send(resultadoFb);
}

module.exports = { listAll, listById, createCart, addProduct, deleteCart, removeProductById }