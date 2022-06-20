var express = require('express');
var router = express.Router();

const { createMovie, listMovies, updateMovie, deleteMovie } = require('../controllers/movies')
router
  .post('/add', createMovie)
  .get('/list', listMovies)
  .post('/edit', updateMovie)
  .get('/delete/:uid', deleteMovie)

module.exports = router;