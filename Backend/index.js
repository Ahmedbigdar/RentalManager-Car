const express = require("express");
const app = express();
// I have error in front this is why i install this to fix it  "Cors"
const Cors = require("cors")
const connection = require("./config/connection")
connection();
const router = require("./routes/carsRouter")
app.use(Cors())
app.use(express.json());
app.use("/Voiture", router)
app.use("/Location", require("./routes/LocationRouter"))
app.use("/user" ,require('./routes/userRoutes') )
app.listen(3000, console.log("Server's Running"));










