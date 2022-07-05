const Movie = require('../models/Movies');

const createMovie = async(req, res) => {
  const { titulo, sinopsis, poster, lanzamiento, genero, fondo, trailer } = req.body
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
        fondo,
        trailer
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
    const { uid, titulo, sinopsis, poster, lanzamiento, genero, fondo, trailer } = req.body
    const data = await Movie.updateOne(
      { _id: uid },
      {
        $set: {
          titulo, 
          sinopsis, 
          poster, 
          lanzamiento, 
          genero, 
          fondo,
          trailer
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
  const { elementos } = req.body
  try{
    const movies_action = await Movie.find({genero: 'Action'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_adventure = await Movie.find({genero: 'Adventure'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_animation = await Movie.find({genero: 'Animation'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_comedy = await Movie.find({genero: 'Comedy'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_crime = await Movie.find({genero: 'Crime'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_documentary = await Movie.find({genero: 'Documentary'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_drama = await Movie.find({genero: 'Drama'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_family = await Movie.find({genero: 'Family'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_fantasy = await Movie.find({genero: 'Fantasy'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_history = await Movie.find({genero: 'History'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_horror = await Movie.find({genero: 'Horror'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_music = await Movie.find({genero: 'Music'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_mystery = await Movie.find({genero: 'Mystery'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_romance = await Movie.find({genero: 'Romance'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_science_fiction = await Movie.find({genero: 'Science Fiction'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_tv_movie = await Movie.find({genero: 'TV Movie'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_thriller = await Movie.find({genero: 'Thriller'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_war = await Movie.find({genero: 'War'}).sort({"lanzamiento": -1}).limit(elementos)
    const movies_western = await Movie.find({genero: 'Western'}).sort({"lanzamiento": -1}).limit(elementos)

    const movies = movies_action.concat(movies_adventure).concat(movies_animation).concat(movies_comedy).concat(movies_crime).concat(movies_documentary).concat(movies_drama).concat(movies_family).concat(movies_fantasy).concat(movies_history).concat(movies_horror).concat(movies_music).concat(movies_mystery).concat(movies_romance).concat(movies_science_fiction).concat(movies_tv_movie).concat(movies_thriller).concat(movies_war).concat(movies_western);

    return res.status(200).json({
      movies
    });
  }  catch (err) {
    return res.status(404).json({
      mensaje: err
    });
  }
}

const moviesByGenre = async(req, res) => {
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

module.exports = { createMovie, updateMovie, deleteMovie, listMovies, lastMovie, lastTwoMovies, latestMovies, latestMoviesByGenre, moviesByGenre }