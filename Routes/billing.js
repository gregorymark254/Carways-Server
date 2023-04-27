const bill = require("../Controller/billingController");
const Billing = require("../Models/billing")
const Payment = require("../Models/billing")

var router = require("express").Router();

// Create a new Tutorial
router.post("/add", (req,res) => {
    // Create a Billing
    const { billingData,paymentData } = req.body

    // Validate request
    if (!billingData || !paymentData) {
        res.status(400).send({
        message: "Billing and Payment data cannot be empty!"});
        return;
    }

    // Save payment in the database
    Billing.create(billingData)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message : err.message || "Some error occurred while creating the Billing."
        });
    });
    Payment.create({paymentData})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message : err.message || "Some error occurred while creating the Billing."
    });
  });
});

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
