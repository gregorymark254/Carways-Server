const db = require("../Models/index");
const Booking = db.bookingInfo;
const Op = db.Sequelize.Op;

// Create and Save a new booking
exports.create = (req, res) => {
  // Validate request
  if (!req.body.car) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a payment
  const bookings = {
    car: req.body.car,
    pickLocation: req.body.pickLocation,
    dropLocation: req.body.dropLocation,
    pickDate: req.body.pickDate,
    pickTime: req.body.pickTime,
    dropDate: req.body.dropDate,
    dropTime: req.body.dropTime,
    duration: req.body.duration,
    quantity: req.body.quantity,
    people: req.body.people,
    services: req.body.services,
  };

  // Save payment in the database
  Booking.create(bookings)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message : err.message || "Some error occurred while creating the Booking."
      });
    });
};

// Retrieve all Booking from the database.
exports.findAlls = (req, res) => {
  const car = req.query.car;
  var condition = car ? { car: { [Op.like]: `%${car}%` } } : null;

  Booking.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({message : err.message || "Some error occurred while retrieving Booking."
      });
    });
};

// Find a single Booking with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Booking.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving Booking with id=" + id
      });
    });
};

// Update a Booking by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Booking.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({message: "Booking was updated successfully."
        });
      } else {
        res.send({ message: `Cannot update Booking with id=${id}. Maybe Booking was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating Booking with id=" + id
      });
    });
};

// Delete a Booking with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Booking.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Booking was deleted successfully!"
        });
      } else {
        res.send({ message: `Cannot delete Booking with id=${id}. Maybe Booking was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Booking with id=" + id
      });
    });
};

// Delete all Booking from the database.
exports.deleteAll = (req, res) => {
  Booking.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {res.send({ message: `${nums} Booking were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Some error occurred while removing all Booking."
      });
    });
};