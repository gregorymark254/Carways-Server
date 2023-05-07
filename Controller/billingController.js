const db = require("../Models/index");
const Billing = db.billingInfo;
const Op = db.Sequelize.Op;

// Create and Save a new billing
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a billing
  const billing = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    address2: req.body.address2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    cardName: req.body.cardName,
    cardNumber: req.body.cardNumber,
    expiryDate: req.body.expiryDate,
    cvv: req.body.cvv,
    additionalNote: req.body.additionalNote
  };

  // Save billing in the database
  Billing.create(billing)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message : err.message || "Some error occurred while creating the billing."
      });
    });
};

// Retrieve all billing from the database.
exports.findAlls = (req, res) => {
  const firstName = req.query.firstName;
  var condition = firstName ? { firstName: { [Op.like]: `%${firstName}%` } } : null;

  Billing.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({message : err.message || "Some error occurred while retrieving billing."
      });
    });
};

// Find a single billing with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Billing.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving billing with id=" + id
      });
    });
};

// Update a billing by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Billing.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({message: "billing was updated successfully."
        });
      } else {
        res.send({ message: `Cannot update billing with id=${id}. Maybe billing was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating billing with id=" + id
      });
    });
};

// Delete a billing with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Billing.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "billing was deleted successfully!"
        });
      } else {
        res.send({ message: `Cannot delete billing with id=${id}. Maybe billing was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete billing with id=" + id
      });
    });
};

// Delete all billing from the database.
exports.deleteAll = (req, res) => {
  Billing.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {res.send({ message: `${nums} billing were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while removing all billing."
      });
    });
};