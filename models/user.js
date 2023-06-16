module.exports = (sequelize, Sequelize) => {
  const definition = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    info: {
      type: Sequelize.STRING,
    },
    number: {
      type: Sequelize.STRING,
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      references: { model: "user_types", key: "id" },
      allowNull: false,
    },
  };

  const options = {
    tableName: "users",
    underscored: true,
  };
  const Model = sequelize.define("users", definition, options);

  Model.associate = (models) => {
    Model.hasOne(models.userTypes);
  };

  Model.sync();

  return Model;
};
