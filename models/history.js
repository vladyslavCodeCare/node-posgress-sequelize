module.exports = (sequelize, Sequelize) => {
  const definition = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userName: {
      type: Sequelize.STRING,
    },
    points: {
      type: Sequelize.INTEGER,
    },
  };

  const options = {
    tableName: "history",
    underscored: false,
  };

  const Model = sequelize.define("history", definition, options);

  return Model;
};
