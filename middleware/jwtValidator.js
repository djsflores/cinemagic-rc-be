require('dotenv').config()
const jwt = require('jsonwebtoken')

const secretKey = process.env.SECRET_KEY

const jwtValidator = async(req, res, next) =>{
  const { accessToken } = req.body
  try{
    const verify = jwt.verify(accessToken, secretKey)
    if(verify){
      return next()
    }
  } catch(error){
    res.json({
      estado: 401,
      mensaje: 'Cliente NO autorizado'
    })
  }

} 
module.exports = { jwtValidator }