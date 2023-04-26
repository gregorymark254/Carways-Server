module.exports = (sequelize, Sequelize) => {
  const Billing = sequelize.define("billings", {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    address2: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    zip: {
      type: Sequelize.STRING
    }
  });

  // const Payment = sequelize.define("payments", {
  //   cardName: {
  //     type: Sequelize.STRING
  //   },
  //   cardNumber: {
  //     type: Sequelize.STRING
  //   },
  //   expiryDate: {
  //     type: Sequelize.STRING
  //   },
  //   cvv: {
  //     type: Sequelize.STRING
  //   },
  //   additionalNote: {
  //     type: Sequelize.STRING
  //   }
  // });

  return Billing;
};
      