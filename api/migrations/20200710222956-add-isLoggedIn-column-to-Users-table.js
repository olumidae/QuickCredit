module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'isLoggedIn', {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }),

  down: async (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'isLoggedIn'),

};
