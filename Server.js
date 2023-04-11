require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const corsOption = require("./Db/corsOption")
const mongoconnect = require("./Db/MongoDb")
const auth = require("./Routes/auth")
const billing = require("./Routes/bills")
const booking = require("./Routes/books")
const payment = require("./Routes/pays")
const {logger } = require("./Middleware/logEvents")
const errorHandler = require("./Middleware/errorHandler")

//connection to mongodb
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
// app.use("/api/v4", payment) //payment route


//Error handler
app.use(errorHandler)

//Connetion to the server
const PORT = process.env.PORT 
const server = app.listen(PORT, () => console.log(`Server is running on port:${PORT}`))