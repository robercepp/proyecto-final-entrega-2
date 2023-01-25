const adminFirebase = require('firebase-admin');
const mongoose = require ('mongoose')


const iniciarServidorFirebase = async () => {
    const FBServiceAccount = require ('./utils/anabellaecommerce-firebase-adminsdk-hpvar-3ee6cfd498.json');
    try {
      adminFirebase.initializeApp({
        credential: adminFirebase.credential.cert(FBServiceAccount)
      })
      console.log('Firebase se encuentra conectado')
    } catch(error) {
      console.log(error)
    }
  }
  
  const connectDB = async () => {
    const url = 'mongodb://127.0.0.1:27017/anabellaecommerce'
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

  module.exports = {iniciarServidorFirebase, connectDB}