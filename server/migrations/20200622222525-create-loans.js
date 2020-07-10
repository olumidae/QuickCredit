module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Loans', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId',
      },
    },
    status: {
      type: Sequelize.ENUM,
      values: ['pending', 'approved', 'rejected'],
      defaultValue: 'pending',
      allowNull: false,
    },
    repaid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      default: false,
    },
    tenor: {
      type: Sequelize.ENUM,
      values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      allowNull: false,
    },
    amount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    payableInstallment: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    balance: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    interest: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Loans'),
};
