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
    underscored: true,
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

  Model.sync();

  return Model;
};
