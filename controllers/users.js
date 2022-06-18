const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async(req, res) => {
  const { email, password, nombre, usuario } = req.body
  const regex = new RegExp(email, 'i')
  const result = await User.find({ email: {$regex: regex} })
  if(result.length === 0){
    const passEncrypted = bcrypt.hashSync(password, 10);
    try{
      const newUser = new User({
        nombre,
        usuario,
        email,
        password: passEncrypted
      });
      await newUser.save();
      return res.status(200).json({
        mensaje: 'Usuario creado exitosamente.'
      });
    } catch(error) {
      return res.status(404).json({
        error
      })
    }
  } else {
    return res.status(404).json({
      mensaje: 'El correo ingresado ya fue registrado anteriormente.'
    });
  }
}

const validateUser = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if(!user){
    return res.status(404).json({
      mensaje: 'Usuario inexistente'
    })
  }
  const token = jwt.sign({ user }, 'cinemagic', { expiresIn: '1h' });
  const match = bcrypt.compareSync(password, user.password);
  const nombreUsuario = user.usuario;
  if(match){
    return res.status(200).json({
      mensaje: 'Usuario logueado exitosamente',
      token,
      nombreUsuario
    });
  } else {
    return res.status(404).json({
      mensaje: 'Usuario o contraseña invalida'
    });
  }
}

module.exports = { createUser, validateUser }