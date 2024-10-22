module.exports = (sequelize, Sequelize) => {
  const definition = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userIdOne: {
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      allowNull: false,
    },
    userIdTwo: {
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      allowNull: false,
    },
  };

  const options = {
    tableName: "friends",
    underscored: false,
    indexes: [
      {
        fields: ["userIdOne", "userIdTwo"],
      },
    ],

    hooks: {},
  };
  const Model = sequelize.define("friends", definition, options);

  Model.associate = (models) => {
    Model.hasMany(models.users);
  };

  // Model.sync();

  return Model;
};
