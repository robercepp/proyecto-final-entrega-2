const contenedorCarritosFs = require ('../../classes/carrito.js')

module.exports = class CarritosDaoFileSystem extends contenedorCarritosFs {
    constructor() {
        super("./db/carrito.txt")
    }
    async listAll(){
        const data = await this.getAll()
        console.log(data)
        return data;
    }

    async listById(id){
        const data = await this.getById(id)
        return data;
    }

    async createCart(){
        const data = await this.save()
        return data
    }

    async removeCart(id){
        const data = await this.delete(id)
        return data
    }

    async updateCart(id, cant){
        const data = await this.addProduct(id, cant)
        return data
    }

    async removeProduct(idUser, idProd){
        const data = await this.deleteProductById(idUser, idProd)
        return data
    }

}