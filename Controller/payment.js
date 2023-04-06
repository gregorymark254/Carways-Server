const db = require("../Models/index");
const Payments = db.paymentInfo;
const Op = db.Sequelize.Op;

// Create and Save a new payment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.cardName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a payment
  const payment = {
    cardName: req.body.cardName,
    cardNumber: req.body.cardNumber,
    expiryDate: req.body.expiryDate,
    cvv: req.body.cvv,
    additionalNote: req.body.additionalNote
  };

  // Save payment in the database
  Payments.create(payment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message : err.message || "Some error occurred while creating the Payments."
      });
    });
};

// Retrieve all Payments from the database.
exports.findAlls = (req, res) => {
  const cardNumber = req.query.cardNumber;
  var condition = cardNumber ? { cardNumber: { [Op.like]: `%${cardNumber}%` } } : null;

  Payments.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({message : err.message || "Some error occurred while retrieving Payments."
      });
    });
};

// Find a single Payments with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Payments.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Payments with id=" + id
      });
    });
};

// Update a Payments by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Payments.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({message: "Payments was updated successfully."
        });
      } else {
        res.send({ message: `Cannot update Payments with id=${id}. Maybe Payments was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating Payments with id=" + id
      });
    });
};

// Delete a Payments with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Payments.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Payments was deleted successfully!"
        });
      } else {
        res.send({ message: `Cannot delete Payments with id=${id}. Maybe Payments was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Payments with id=" + id
      });
    });
};

// Delete all Payments from the database.
exports.deleteAll = (req, res) => {
  Payments.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {res.send({ message: `${nums} Payments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while removing all Payments."
      });
    });
};