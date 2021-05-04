"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      Username: DataTypes.STRING,
      Password: DataTypes.STRING,
      Address: DataTypes.STRING,
      Country: DataTypes.STRING,
      State: DataTypes.STRING,
      zip: DataTypes.STRING,
      NameOnCard: DataTypes.STRING,
      CardNumber: DataTypes.STRING,
      Expiration: DataTypes.STRING,
      cvv: DataTypes.STRING,
      Phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
