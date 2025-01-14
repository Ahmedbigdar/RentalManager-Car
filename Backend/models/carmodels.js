const mongoose = require("mongoose");

const immatriculeRegex = /^\d{4}-[A-Z]-\d{2}$/;

const CarSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required:true,
    },
    immatricule: {
      type: String,
      required: true,
      match: immatriculeRegex,
      unique: true,
    },
    anneedimmatricule: {
      type: Number,
      required: true,
      min: 1,
      max: new Date().getFullYear(),
    },

    kilometrage: {
      type: Number,
      required: true,
      min: 0,
      runvalidator: true,
    },
    prix: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON : {virtuals:true} , toObject: {virtuals:true}
  }
);
CarSchema.virtual("location" , {
  ref:'Location',
  foreignField :'voiture',
  localField:'_id'
})

module.exports = mongoose.model("Cars", CarSchema);
