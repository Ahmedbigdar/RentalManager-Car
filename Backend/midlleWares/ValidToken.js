const jwt = require("jsonwebtoken")



function ValidToken (req,res,next) {
   try {
    const {token} = req.headers


    if(!token)
        return res.status(400).json({message : "token Not valid"})


    const payload  = jwt.verify(token , 'dev')

    req.user = payload
    next()
   } catch (error) {
    res.status(500).json({message : error.message})
   }



}



module.exports = ValidToken