const Car = require("../models/carmodels");

/**
 * @description creer un nouveau Car
 * @router / Cars
 * @methode POST
 */
const CreateCar = async (req, res) => {
  try {
    const { immatricule } = req.body;
    const CarExist = await Car.findOne({ immatricule });

    if (CarExist) {
      res.status(400).json({ message: "This immatricule already exists" });
      return;
    }

    const newCar = await Car.create(req.body);
    res.json(newCar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/**
 * @description Afficher tout les voitures
 * @router / Cars
 * @methode GET
 */
const getCars = async (req, res) => {
  try {
    const Allcars = await Car.find().populate('location').sort({ nom: 1 });

    res.status(200).json(Allcars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Afficher tout les voitures by id
 * @router / Cars/:id
 * @methode GET
 */

const getCarsById = async (req, res) => {
  try {
    const CarsById = await Car.findById(req.params.id);

    if (!CarsById) {
      return res.status(404).json({ message: "This Car Not Found" });
    } else {
      res.status(200).json(CarsById);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Edite les voitures by id
 * @router / Cars/:id
 * @methode PUT
 */

const CarsUpdated = async (req, res) => {
  try {
    const CarUpdated = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!CarUpdated) {
      res.status(404).json({ message: "This Car dosent Exist" });
    } else {
      res.json(CarUpdated);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @description Supprimer les voitures by id
 * @router / Cars/:id
 * @methode DELETE
 */

const DeleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      res.status(404).json({ message: "This Car dosent Exist" });
    } else {
      await Car.findByIdAndDelete(req.params.id, {
        new: true,
        runValidators: true,
      });
      res.json({ message: " This  Car deleted successfuly" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};








module.exports = {
  CreateCar,
  getCars,
  getCarsById,
  CarsUpdated,
  DeleteCar,
};
