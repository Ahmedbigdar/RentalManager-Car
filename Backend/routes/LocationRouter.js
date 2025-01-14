const express = require('express')
const router = express.Router()
const Validlocation = require("../midlleWares/ValidLocation")
const {CreateLocation, GetLocation,getlocationByid,EditLocationById,DeletLocationById,DemarrerLocation,TerminerLocation, checkEtat} = require("../controller/LocationController")

router.post("/",CreateLocation);
router.get("/",GetLocation);
router.get("/:id",Validlocation,getlocationByid );
router.put("/:id",Validlocation,EditLocationById);
router.delete("/:id",Validlocation,DeletLocationById);
router.put("/demarrer/:id",Validlocation,DemarrerLocation);
router.put("/termine/:id",Validlocation,TerminerLocation);
router.post("/check",checkEtat);


module.exports= router