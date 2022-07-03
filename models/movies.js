const {Schema, model} = require('mongoose');

const movie = new Schema({
  titulo : String, 
  sinopsis : String, 
  poster : String, 
  lanzamiento : Date, 
  genero : String, 
  fondo : String, 
  trailer : String
});

module.exports = model('Movies', movie);