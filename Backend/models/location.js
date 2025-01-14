const mongoose = require("mongoose")


function compareDates(dateDepart, dateFin) {
    const departDate = new Date(dateDepart); 
    const finDate = new Date(dateFin);      
    return finDate > departDate;            
}


const LocationSchema = new mongoose.Schema({
    dateDepart : {
        type : String,
        require:true,
        match : /^\d{4}-\d{2}-\d{2}$/,
        min : new Date().toISOString().split('T')[0],
    },
    dateFin : {
        type : String,
        require : true,
        match : /^\d{4}-\d{2}-\d{2}$/,
        validate: {
            validator: function (value) {
                
                return compareDates(this.dateDepart, value);
            },
            message: `dateFin must be greater than dateDepart.`,
        },
    },
   nom : {
    type:String,
    require: true,
   },
   prenom : {
    type:String,
    require: true,
   }, 
   cin : {
    type: String, 
    require : true,
    match : /^[A-Z]{1,2}\d{1,8}$/,
    unique : true,
   }, 
   numeroTelephone : {
    type : String,
    require: true,
   },
   adresse : {
    type : String,
    require: true,
   },
   prixTotal:{
    type:Number,
   },
voiture : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Cars',
    required:true,
},
   etat : {
    type: String,
    enum : ["Nouvelle",'en Cours', 'Termine'],
    default: 'Nouvelle'
   },
},{
    timestamps: true,
  })

module.exports = mongoose.model("Location", LocationSchema);