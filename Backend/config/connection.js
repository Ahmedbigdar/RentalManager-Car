const mongoose  = require("mongoose")

function connection (){
    mongoose.connect('mongodb+srv://ahmedbigdar2004:AHMEDmassira12345@cluster0.a0ntw.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("Mongoose connected successfuly")).catch(e => console.log(e))
}



module.exports = connection