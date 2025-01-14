const mongoose = require("mongoose")


function  Validlocation(req,res,next) {
    if(mongoose.isValidObjectId(req.params.id)){
        next();
    } else{
        res.status(404).json({message : "This Location Not Found"})
    }
}


module.exports = Validlocation