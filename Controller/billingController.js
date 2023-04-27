const db = require("../Models/index");
const Billing = db.billingInfo;
const Op = db.Sequelize.Op;

// Create and Save a new Billing
exports.create = (req, res) => {

  // Validate request
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Billing and Payment data cannot be empty!"
    });
    return;
  }
  
  const billing = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone : req.body.phone,
    address : req.body.address,
    address2 : req.body.address2,
    city : req.body.city,
    state : req.body.state,
    zip: req.body.zip,
    cardName: req.body.cardName,
    cardNumber: req.body.cardNumber,
    expiryDate: req.body.expiryDate,
    cvv: req.body.cvv,
    additionalNote: req.body.additionalNote
  }
  
  // Save payment in the database
  Billing.create(billing)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message : err.message || "Some error occurred while creating the Billing."
    });
  });
};

// Retrieve all Billing from the database.
exports.findAlls = (req, res) => {
  const firstName = req.query.firstName;
  var condition = firstName ? { firstName: { [Op.like]: `%${firstName}%` } } : null;

  Billing.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({message : err.message || "Some error occurred while retrieving Billing."
      });
    });
};

// Find a single Billing with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Billing.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Billing with id=" + id
      });
    });
};

// Update a Billing by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Billing.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({message: "Billing was updated successfully."
        });
      } else {
        res.send({ message: `Cannot update Billing with id=${id}. Maybe Billing was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating Billing with id=" + id
      });
    });
};

// Delete a Billing with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Billing.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Billing was deleted successfully!"
        });
      } else {
        res.send({ message: `Cannot delete Billing with id=${id}. Maybe Billing was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Billing with id=" + id
      });
    });
};

// Delete all Billing from the database.
exports.deleteAll = (req, res) => {
  Billing.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {res.send({ message: `${nums} Billing were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while removing all Billing."
      });
    });
};