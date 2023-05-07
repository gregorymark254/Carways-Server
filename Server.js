require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const corsOption = require("./Db/corsOption")
const mongoconnect = require("./Db/MongoDb")
const auth = require("./Routes/auth")
const billing = require("./Routes/billing")
const booking = require("./Routes/booking")
const email = require("./Routes/mail")
const cars = require("./Routes/cars")
const {logger } = require("./Middleware/logEvents")
const errorHandler = require("./Middleware/errorHandler")

//connection to Databases
mongoconnect()
const db = require("./Models/index");
db.sequelize.sync();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors(corsOption))
app.use(logger)


//routes
app.get("/", (req, res) => {
    res.json({Message:"Car Rental System Backend Server."});
});
app.use("/api/v1", auth) //auth route
app.use("/api/v2", billing) //billing route
app.use("/api/v3", booking) //booking route
app.use("/api/v4", email) //Email route
app.use("/api/v5", cars) //cars route


//Error handler
app.use(errorHandler)


//Connetion to the server
const PORT = process.env.PORT 
const server = app.listen(PORT, () => console.log(`Server is running on port:${PORT}`))