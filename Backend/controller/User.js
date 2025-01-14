const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")


/**
 * @description creer un nouveau compte
 * @router /register
 * @methode POST
 */


const Register = async (req,res)=>{
try {
    const {name,email,password} = req.body

    if(! name || ! email || ! password)
        return res.status(400).json({message : 'il faut remplir tout les champs'})

    const userExist  = await User.findOne({email})

    if(userExist)
        return res.status(400).json({message : `this ${email} already exist`})

    const hashpassword  =await  bcrypt.hash(password , 10)

    const NewUser = await User.create({name,email,password : hashpassword})

    res.status(200).json(NewUser)

} catch (error) {
    res.status(500).json({message : error.message})
}
}


/**
 * @description creer un nouveau compte
 * @router /register
 * @methode POST
 */



const Login = async (req,res)=>{
    try {
        const  {email,password} = req.body

        if(! email || ! password)
            return res.status(400).json({message : "il faut remplir tout les champs"})
// check if user exist 
        const userExist = await User.findOne({email})

        if(! userExist)
            return res.status(400).json({message :'email or password incorrect'})
// check if password correct
        const isPassword  = await bcrypt.compare(password, userExist.password)
        if(!isPassword)
            return res.status(400).json({message :'email or password incorrect'})

const token = jwt.sign({_id : userExist._id, name : userExist.name}, "dev" , {expiresIn : "24h"})

res.status(200).json({token, message : "Connected"})


    } catch (error) {
        res.status(500).json({message : error.message})
    }
}





module.exports = {
    Register,Login
}