const payments = require("../Controller/payment");

var router = require("express").Router();

// Create a new Tutorial
router.post("/add", payments.create);

// Retrieve all payments
router.get("/all", payments.findAlls);

// Retrieve a single Tutorial with id
router.get("/all/:id", payments.findOne);

// Update a Tutorial with id
router.put("/put/:id", payments.update);

// Delete a Tutorial with id
router.delete("/delete/:id", payments.delete);

// Delete all payments
router.delete("/delete", payments.deleteAll);

module.exports = router
