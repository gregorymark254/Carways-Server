module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payments", {
    cardName: {
      type: Sequelize.STRING
    },
    cardNumber: {
      type: Sequelize.STRING
    },
    expiryDate: {
      type: Sequelize.STRING
    },
    cvv: {
      type: Sequelize.STRING
    },
    additionalNote: {
      type: Sequelize.STRING
    }
  });

  return Payment;
};
      