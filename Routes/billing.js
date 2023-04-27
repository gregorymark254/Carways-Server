const bill = require("../Controller/billingController");
const db = require("../Models/index");
const Billing = db.billingInfo 
const Payment = db.paymentInfo;

var router = require("express").Router();

// Create a new Tutorial
router.post("/add", async (req,res) => {
    // Create a Billing
    const { billingData,paymentData } = req.body

    // Validate request
    if (!billingData || !paymentData) {
        res.status(400).send({
        message: "Billing and Payment data cannot be empty!"});
        return;
    }


    try {
        // Save payment in the database
        const billing = await Billing.build(billingData)
        billingData.billingId = billing.id
        billing.save()
        .then(data => {
            console.log("New billing record created successfully:", data);
        })
        .catch(error => {
            console.error("Error while creating new billing record:", error);
        });
        const payment = await Payment.create(paymentData);
        res.json({ billing, address });
    } catch (error) {
        console.log(error)
        res.status(500).send('Error adding user and address to database');
    }


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
