const adminUsers = require('../seed-data/adminUsers');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [adminUsers[0]]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
