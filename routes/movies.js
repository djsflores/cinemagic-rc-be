var express = require('express');
var router = express.Router();

const { createMovie, listMovies, updateMovie, deleteMovie } = require('../controllers/movies')
const { jwtAdmValidator } = require('../middleware/jwtAdmValidator')

router
  .post('/add', jwtAdmValidator, createMovie)
  .get('/list', listMovies)
  .put('/edit', jwtAdmValidator, updateMovie)
  // .get('/delete/:uid', deleteMovie)
  .delete('/delete', jwtAdmValidator, deleteMovie)

module.exports = router;