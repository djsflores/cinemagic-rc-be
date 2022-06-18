const {Schema, model} = require('mongoose');

const user = new Schema({
  nombre: String,
  usuario: String,
  email: String,
  password: String
});

module.exports = model('Users', user);