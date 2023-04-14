const { Model, DataTypes } = require("sequelize");
const bycrpt = require("bcrypt");
const sequelize = requre("../config/connection");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      is: ["/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*+=|-]).{8}$/"],
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (newRecipe) => {
        try {
          newRecipe.password = await bcrypt.hash(newRecipe.password, 10);
          return newRecipe;
        } catch (error) {
          console.log(error);
        }
      },
      beforeUpdate: async (updatedRecipie) => {
        try {
          updatedRecipie.password = await bycrpt.hash(
            updatedRecipie.password,
            10
          );
          return updatedRecipie;
        } catch (error) {
          console.log(error);
        }
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);
module.exports = User;
