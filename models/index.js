const Recipie = require("./Recipie");
const User = require("./User");

Recipie.hasOne(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
User.hasMany(Recipie, {
  foreignKey: "reader_id",
  onDelete: "CASCADE",
});
Recipie.belongsTo(User, {
  foreignKey: "reader_id",
});
module.exports = { User, Recipie };
