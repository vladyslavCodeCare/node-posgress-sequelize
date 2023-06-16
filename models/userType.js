module.exports = (sequelize, Sequelize) => {
  const definition = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    label: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  };

  const options = {
    tableName: "user_types",
    underscored: true,
  };

  const Model = sequelize.define("userTypes", definition, options);

  Model.associate = (models) => {
    Model.belongsTo(models.users);
  };

  return Model;
};
