

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableDefinition = await queryInterface.describeTable('Loans');
    if (tableDefinition.status === undefined) {
      return queryInterface.addColumn('Loans', 'tenor', { type: Sequelize.STRING }).then(() => {
        const pgEnumDropQuery = queryInterface.QueryGenerator.pgEnumDrop('Loans', 'tenor');
        return queryInterface.sequelize.query(pgEnumDropQuery);
      }).then(() => queryInterface.changeColumn('Loans', 'tenor', {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      }));
    }
  },

  down: async (queryInterface, Sequelize) => {
    const tableDefinition = await queryInterface.describeTable('Loans');
    if (tableDefinition.status) {
      return queryInterface.removeColumn('Loans', 'tenor');
    }
    return queryInterface.addColumn('Complains', 'status', { type: Sequelize.STRING }).then(() => {
      const pgEnumDropQuery = queryInterface.QueryGenerator.pgEnumDrop('Loans', 'tenor');
      return queryInterface.sequelize.query(pgEnumDropQuery);
    }).then(() => queryInterface.changeColumn('Loans', 'tenor', {
      type: Sequelize.ENUM,
      allowNull: false,
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    }));
  },
};
