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
      allowNull: false,
    },
    info: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userTypeId: {
      type: Sequelize.INTEGER,
      references: { model: "user_types", key: "id" },
      allowNull: false,
    },
  };

  const options = {
    tableName: "users",
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["user_type_id"],
      },
    ],
    scopes: {
      getMinUsers() {
        return {
          attributes: ["id", "name"],
        };
      },
    },
  };
  const Model = sequelize.define("users", definition, options);

  Model.associate = (models) => {
    Model.hasOne(models.userTypes);
  };

  Model.sync();

  return Model;
};
