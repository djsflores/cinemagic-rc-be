const Movie = require('../models/Movies');

const createMovie = async(req, res) => {
  const { titulo, sinopsis, poster, lanzamiento, genero, fondo } = req.body

  const regex = new RegExp(titulo, 'i')
  const result = await Movie.find({ titulo: {$regex: regex} })
  if(result.length === 0){
    
    try{
      const newMovie = new Movie({
        titulo, 
        sinopsis, 
        poster, 
        lanzamiento, 
        genero, 
        fondo
      });
      await newMovie.save();
      return res.status(200).json({
        mensaje: 'Película agregada exitosamente.'
      });
    } catch(error) {
      return res.status(404).json({
        error
      })
    }
  } else {
    return res.status(404).json({
      mensaje: 'La pelicula ya fue agregada anteriormente.'
    });
  }
}

const updateMovie = async(req, res) => {
  try {
    const { uid, titulo, sinopsis, poster, lanzamiento, genero, fondo } = req.body

    const data = await Movie.updateOne(
      { _id: uid },
      {
        $set: {
          titulo, 
          sinopsis, 
          poster, 
          lanzamiento, 
          genero, 
          fondo
        },
      }
    );
    return res.status(200).json({
      mensaje: 'Película actualizada exitosamente.'
    });

  } catch (err) {
    return res.status(404).json({
      mensaje: err
    });
  }
}

const deleteMovie = async(req, res) => {
  try{
    // const { uid } = req.params
    const { uid } = req.body

    const data = await Movie.deleteOne({ _id: uid });

    return res.status(200).json({
      mensaje: 'Película eliminada exitosamente.'
    });
  }catch (err) {
    return res.status(404).json({
      mensaje: err
    });
  }
}

const listMovies = async(req, res) => {
  try{
    const movies = await Movie.find({})
    return res.status(200).json({
      movies
    });
  }  catch (err) {
    return res.status(404).json({
      mensaje: err
    });
  }
}

const lastMovie = async(req, res) => {
  try{
    const movie = await Movie.find().sort({"lanzamiento": -1}).limit(1)
    return res.status(200).json({
      movie
    });
  }  catch (err) {
    return res.status(404).json({
      mensaje: err
    });
  }
}

const lastTwoMovies = async(req, res) => {
  try{
    const movie = await Movie.find().sort({"lanzamiento": -1}).limit(2)
    return res.status(200).json({
      movie
    });
  }  catch (err) {
    return res.status(404).json({
      mensaje: err
    });
  }
}

const latestMovies = async(req, res) => {
  const { elementos } = req.body
  try{
    const movies = await Movie.find().sort({"lanzamiento": -1}).limit(elementos)
    return res.status(200).json({
      movies
    });
  }  catch (err) {
    return res.status(404).json({
      mensaje: err
    });
  }
}

const latestMoviesByGenre = async(req, res) => {
  const { genero, elementos } = req.body
  // const movies;
  let movies;
  try{
    if(genero === 'all'){
      movies = await Movie.find({}).sort({"lanzamiento": -1}).limit(elementos)
    } else {
      movies = await Movie.find({genero: genero}).sort({"lanzamiento": -1}).limit(elementos)
    }
    return res.status(200).json({
      movies
    });
  }  catch (err) {
    return res.status(404).json({
      mensaje: err
    });
  }
}

module.exports = { createMovie, updateMovie, deleteMovie, listMovies, lastMovie, lastTwoMovies, latestMovies, latestMoviesByGenre }