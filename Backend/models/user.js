const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        match : /^\S+@\S+\.\S+$/,
        type : String,
        required:true,
        unique : true,
    },
    password : {
        type : String,
        require:true,
        minlength : 8,
    },
    isAdmin : {
        type : Boolean,
        default : false,
    }
});

 

module.exports =mongoose.model("user", Userschema)