const Location = require("../models/location");
const Voiture = require("../models/carmodels");

/**
 * @description creer un nouveau Location
 * @router / Location
 * @methode POST
 */

const CreateLocation = async (req, res) => {
  try {
    const voiture = await Voiture.findById(req.body.voiture);
    if (!voiture) {
      return res.status(404).json({ message: "Voiture introuvable" });
    }

    const dateDepart = new Date(req.body.dateDepart);
    const dateFin = new Date(req.body.dateFin);
    if (isNaN(dateDepart) || isNaN(dateFin)) {
      return res.status(400).json({ message: "les Dates non Valider" });
    }

    const prixTotal =
      voiture.prix * ((dateFin - dateDepart) / (1000 * 60 * 60 * 24));

    const newLocation = new Location({
      dateDepart: req.body.dateDepart,
      dateFin: req.body.dateFin,
      nom: req.body.nom,
      prenom: req.body.prenom,
      cin: req.body.cin,
      numeroTelephone: req.body.numeroTelephone,
      adresse: req.body.adresse,
      voiture: req.body.voiture,
      prixTotal: prixTotal,
    });

   const SaveLocation  =  await newLocation.save();
    res.status(200).json({ SaveLocation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description afficher les  Locations
 * @router / Location
 * @methode GET
 */

const GetLocation = async (req, res) => {
  try {
    const location = await Location.find()
      .populate("voiture")
      .sort({ dateDepart: -1 });
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description afficher les  Locations by id
 * @router / Location/:id
 * @methode GET
 */

const getlocationByid = async (req, res) => {
  try {
    const { id } = req.params;
    const LocationByid = await Location.findById(id).populate("voiture");
    res.status(200).json(LocationByid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description editer les  Locations by id
 * @router / Location/:id
 * @methode PUT
 */

const EditLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const {dateDepart,dateFin,nom,prenom,cin,numeroTelephone,adresse,prixTotal} = req.body
    const Car = await Voiture.findById(req.body.voiture);

    const datedepart = new Date(req.body.dateDepart);
    const datefin = new Date(req.body.dateFin);
    if (isNaN(datedepart) || isNaN(datefin)) {
      return res.status(400).json({ message: "les Dates non Valider" });
    }

    const PrixTotal =
      Car.prix * ((datefin - datedepart) / (1000 * 60 * 60 * 24));


    const UpdatedLocation = await Location.findByIdAndUpdate(id, {dateDepart,dateFin,nom,prenom,cin,numeroTelephone,adresse,prixTotal : PrixTotal}, {
      new: true,
    });
    if (!UpdatedLocation)
      return res.status(404).json({ message: "this location dosen't exist" });
    res.status(200).json(UpdatedLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description supprimer les Locations by id
 * @router / Location/:id
 * @methode DELTE
 */

const DeletLocationById = async (req, res) => {
  try {
    const { id } = req.params;
    const DeleteLocation = await Location.findOneAndDelete(id);

    if (!DeleteLocation)
      return res.status(404).json({ message: "this location dosen't exist" });

    res.json({ message: "Ok" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Demarrer Locations
 * @router / Location/:id / demarrer
 * @methode POST
 */

const DemarrerLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const Demarre = await Location.findByIdAndUpdate(
      id,
      { etat: "en Cours" },
      { new: true }
    );
    if (!Demarre)
      return res.status(404).json({ message: "Location deose'nt exist" });
    res.json(Demarre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Terminer Locations
 * @router / Location/:id / terminer
 * @methode POST
 */

const TerminerLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const termine = await Location.findById(id);
    if (!termine)
      return res.status(404).json({ message: "Location deose'nt exist" });

    termine.etat = "Termine";
    await termine.save();
    res.json(termine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description check etat of Voiture
 * @router / Cars/:id
 * @methode post
 */

const checkEtat = async (req, res) => {
  try {
    const { dateDepart, dateFin, voiture } = req.body;

    // Validate dates
    if (new Date(dateDepart) < new Date()) {
      return res.status(400).json({ message: "Datedepart invalid" });
    }
    if (new Date(dateFin) <= new Date(dateDepart)) {
      return res.status(400).json({ message: "date Fin should be greater than date depart" });
    }

 
    const overlapping = await Location.find({
      voiture,
      $or: [{ dateDepart: { $lte: dateFin }, dateFin: { $gte: dateDepart } }],
    });

    if (overlapping.length > 0) {
      return res.status(400).json({
        disponible: false,
        message: "La voiture est déjà louée pour ces dates.",
      });
    }


    const voitureDetails = await Voiture.findById(voiture);
    if (!voitureDetails) {
      return res.status(404).json({ message: "Voiture non trouvée." });
    }


    const day =
      (new Date(dateFin) - new Date(dateDepart)) / (1000 * 60 * 60 * 24);
    const prixTotal = day * voitureDetails.prix;

    // Respond with success
    res.status(200).json({
      disponible: true,
      voiture: voitureDetails.nom,
      prixParJour: voitureDetails.prix,
      prixTotal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  CreateLocation,
  GetLocation,
  getlocationByid,
  EditLocationById,
  DeletLocationById,
  DemarrerLocation,
  DemarrerLocation,
  TerminerLocation,
  checkEtat,
};

