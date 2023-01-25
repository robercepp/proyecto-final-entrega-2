const {mongoProds, firebaseProds, filesystemProds} = require ('../daos/DaoGeneral.js')

//productos

async function listAll(req, res) {
    const resultadoFs = await filesystemProds.listAll();
    const resultadoFb = await firebaseProds.listAll();
    const resultado = await mongoProds.listAll();
    return res.send(resultadoFb);
};

async function listById(req, res) {
    let { id } = req.params;
    const resultadoFs = await filesystemProds.listById(id);
    const resultadoFb = await firebaseProds.listById(id);
    const resultado = await mongoProds.listById(id);
    return res.send(resultadoFb);
};

async function createProduct(req, res) {
    const resultadoFs = await filesystemProds.save(req.body);
    const resultadoFb = await firebaseProds.save(req.body);
    const resultado = await mongoProds.save(req.body);
    return res.send(resultadoFb);
};

async function modifyProduct(req, res) {
    const resultadoFs = await filesystemProds.update(req.body, req.params.id);
    const resultadoFb = await firebaseProds.update(req.body, req.params.id);
    const resultado = await mongoProds.update(req.body, req.params.id);
    return res.send(resultadoFb);
};

async function deleteProduct(req, res) {
    const resultadoFs = await filesystemProds.delete(req.params.id);
    const resultadoFb = await firebaseProds.delete(req.params.id)
    const resultado = await mongoProds.delete(req.params.id);
    return res.send(resultadoFb);
}

module.exports = { listAll, listById, createProduct, modifyProduct, deleteProduct }