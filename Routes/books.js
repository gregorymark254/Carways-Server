const booking = require("../Controller/book");

var router = require("express").Router();

// Create a new Tutorial
router.post("/add", booking.create);

// Retrieve all booking
router.get("/all", booking.findAlls);

// Retrieve a single Tutorial with id
router.get("/all/:id", booking.findOne);

// Update a Tutorial with id
router.put("/put/:id", booking.update);

// Delete a Tutorial with id
router.delete("/delete/:id", booking.delete);

// Delete all booking
router.delete("/delete", booking.deleteAll);

module.exports = router
