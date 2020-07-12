module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Enter a Valid Email' },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' },
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: ['verified', 'unverified'],
      defaultValue: 'unverified',
      allowNull: false,
    },
    isLoggedIn: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, { timestamps: true });

  Users.associate = (models) => {
    Users.hasOne(models.Loans, {
      foreignKey: {
        name: 'userId',
        as: 'loan',
        onDelete: 'CASCADE',
      },
    })
  };
  return Users;
};
