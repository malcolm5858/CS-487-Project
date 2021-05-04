"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Drive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Drive.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      drive_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      startLocation: DataTypes.STRING,
      endLocation: DataTypes.STRING,
      price: DataTypes.STRING,
      waitTime: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Drive",
    }
  );
  return Drive;
};
