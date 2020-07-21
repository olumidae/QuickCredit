

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'isAdmin', {
    type: Sequelize.BOOLEAN,
    defaultValues: false,
    allowNull: false,
  }),

  down: async (queryInterface, Sequelize) => queryInterface.removeColumn('Users', 'isAdmin'),
};
