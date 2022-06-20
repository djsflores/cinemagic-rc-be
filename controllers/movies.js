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
    const { uid } = req.params

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

module.exports = { createMovie, listMovies, updateMovie, deleteMovie }