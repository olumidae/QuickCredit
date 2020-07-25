module.exports = (sequelize, DataTypes) => {
  const Loans = sequelize.define('Loans', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pending', 'approved', 'rejected'],
      defaultValue: 'pending',
      allowNull: false,
    },
    repaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tenor: {
      type: DataTypes.ENUM,
      values: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty number not allowed' },
      },
    },
    payableInstallment: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    interest: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, { timestamps: true });

  Loans.associate = (models) => {
    Loans.belongsTo(models.Users);
  };
  return Loans;
}