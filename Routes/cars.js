const router = require("express").Router()
const Cars = require("../Models/cars")

//Adding data to mongodb
router.post("/cars", async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a car
  const car = new Cars({
    src: req.body.src,
    title: req.body.title,
    amount: req.body.amount ? req.body.amount : false
  });

  // Save car in the database
  car.save(car)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
});

//Get all Car
router.get('/all', (req, res) =>{
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Cars.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cars."
      });
    });
})

//Get Car by ID
router.get('/all/:id', (req, res) =>{
  const id = req.params.id;

  Cars.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found car with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving car with id=" + id });
    });
})

// Updating Car
router.post('/update/:id', (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Cars.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update car with id=${id}. Maybe car was not found!`
        });
      } else res.send({ message: "Car was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating car with id=" + id
      });
    });
})


// Deleting Car
router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  Cars.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete car with id=${id}. Maybe car was not found!`
        });
      } else {
        res.send({
          message: "car was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete car with id=" + id
      });
    });
})

module.exports = router;