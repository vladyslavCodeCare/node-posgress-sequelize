module.exports = (sequelize, Sequelize) => {
  const definition = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    message: {
      type: Sequelize.STRING(),
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      allowNull: false,
    },
  };

  const options = {
    tableName: "messages",
    underscored: false,
    indexes: [
      {
        fields: ["userId"],
      },
    ],

    hooks: {},
  };
  const Model = sequelize.define("messages", definition, options);

  Model.associate = (models) => {
    Model.hasOne(models.users);
  };

  return Model;
};
