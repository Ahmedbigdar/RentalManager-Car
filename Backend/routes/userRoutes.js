
const router = require("express").Router()
const controller = require("../controller/User");
const ValidToken = require("../midlleWares/ValidToken")
 


router.post("/register", controller.Register)
router.post("/Login", controller.Login)




module.exports = router