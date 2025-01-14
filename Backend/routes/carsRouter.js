const express = require('express')
const router = express.Router()
const Validation = require("../midlleWares/Validation")
const {CreateCar,getCars,getCarsById,CarsUpdated,DeleteCar} = require("../controller/VoituresController")



router.post('/', CreateCar)
router.get('/', getCars)
router.get('/:id', Validation, getCarsById)
router.put('/:id', Validation, CarsUpdated)
router.delete('/:id', Validation, DeleteCar)


module.exports= router