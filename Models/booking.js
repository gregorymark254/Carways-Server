module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
      car: {
        type: Sequelize.STRING
      },
      pickLocation: {
        type: Sequelize.STRING
      },
      dropLocation: {
        type: Sequelize.STRING
      },
      pickDate: {
        type: Sequelize.STRING
      },
      pickTime: {
        type: Sequelize.STRING
      },
      dropDate: {
        type: Sequelize.STRING
      },
      dropTime: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      people: {
        type: Sequelize.STRING
      },
      services: {
        type: Sequelize.STRING
      }
    });
  
    return Booking;
  };
      