require('dotenv').config()

const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_ADM_KEY

const jwtAdmValidator = async(req, res, next) =>{
  const { accessToken } = req.body
  try{
    const verify = jwt.verify(accessToken, secretKey)
    if(verify){
      return next()
    }
  } catch(error){
    res.json({
      estado: 401,
      mensaje: 'Admin NO autorizado'
    })
  }
}

module.exports = { jwtAdmValidator }