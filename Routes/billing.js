const bill = require("../Controller/billingController");

var router = require("express").Router();

// Create a new Tutorial
router.post("/add", bill.create);

// Retrieve all bill
router.get("/all", bill.findAlls);

// Retrieve a single Tutorial with id
router.get("/all/:id", bill.findOne);

// Update a Tutorial with id
router.put("/put/:id", bill.update);

// Delete a Tutorial with id
router.delete("/delete/:id", bill.delete);

// Delete all bill
router.delete("/delete", bill.deleteAll);

module.exports = router
