const mongoose = require("mongoose")


function  ValidationById(req,res,next) {
    if(mongoose.isValidObjectId(req.params.id)){
        next();
    } else{
        res.status(404).json({message : "This Car Not Found"})
    }
}


module.exports = ValidationById