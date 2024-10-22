module.exports = (sequelize, Sequelize) => {
  const definition = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    info: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    points: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    userTypeId: {
      type: Sequelize.INTEGER,
      references: { model: "user_types", key: "id" },
      allowNull: false,
    },
  };

  const formatNum = (num) => {
    return num.replace(/\D/g, "");
  };

  const options = {
    tableName: "users",
    underscored: false,
    indexes: [
      {
        fields: ["userTypeId"],
      },
      {
        fields: ["name"],
      },
    ],
    scopes: {
      getMinUsers() {
        return {
          attributes: ["id", "name"],
        };
      },
    },
    hooks: {
      //format number
      beforeCreate: (record) => {
        record.number = formatNum(record.number);
        return record;
      },
      beforeUpdate: (record) => {
        record.number = formatNum(record.number);
        return record;
      },
      //creates fistory with user points
      beforeDestroy: async (record) => {
        await sequelize.models.history.create({
          userName: record.name,
          points: record.points,
        });
        return record;
      },
    },
  };
  const Model = sequelize.define("users", definition, options);

  Model.associate = (models) => {
    Model.hasOne(models.userTypes);
    Model.belongsTo(models.messages);
    Model.belongsTo(models.friends);
  };

  // Model.sync();

  return Model;
};
