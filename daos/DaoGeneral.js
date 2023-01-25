const ProductosMongo = require ('./productos/ProductosDaoMongoDb.js');
const CarritosMongo = require ('./carritos/CarritosDaoMongoDb.js');
const ProductosFirebase = require ('./productos/ProductosDaoFirebase.js');
const CarritosFirebase = require ('./carritos/CarritosDaoFirebase.js');
const ProductosFileSystem = require ('./productos/ProductosDaoFileSystem.js')
const CarritosFileSystem = require ('./carritos/CarritosDaoFileSystem.js')

const mongoProds = new ProductosMongo();
const mongoCarts = new CarritosMongo();
const firebaseProds = new ProductosFirebase();
const firebaseCarts = new CarritosFirebase();
const filesystemProds = new ProductosFileSystem();
const filesystemCarts = new CarritosFileSystem();

module.exports = {mongoProds, mongoCarts, firebaseProds, firebaseCarts, filesystemProds, filesystemCarts}