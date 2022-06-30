var express = require('express');
var router = express.Router();

const { createMovie, updateMovie, deleteMovie, listMovies, lastMovie, lastTwoMovies, latestMovies, latestMoviesByGenre } = require('../controllers/movies')
const { jwtAdmValidator } = require('../middleware/jwtAdmValidator')
const { jwtValidator } = require('../middleware/jwtValidator')

router
  // solo administrador
  .post('/add', jwtAdmValidator, createMovie)
  .put('/edit', jwtAdmValidator, updateMovie)
  // .get('/delete/:uid', deleteMovie)
  .delete('/delete', jwtAdmValidator, deleteMovie)
  .get('/list', listMovies)
  // para cualquier visitante
  .get('/last', lastMovie)
  .get('/last2', lastTwoMovies)
  // solo usuarios registrados
  .post('/latest', jwtValidator, latestMovies)
  .post('/latest-by-genre', jwtValidator, latestMoviesByGenre)

module.exports = router;