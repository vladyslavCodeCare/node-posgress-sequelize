const db = require("../../models");
const User = db.user;
const Op = db.Sequelize.Op;
const sequelize = require("sequelize");

/* 
params:
name req
info
number req 
userTypeId req
points
*/

exports.create = (req, res) => {
  const userData = {
    name: req.body.name,
    info: req.body.info,
    number: req.body.number,
    userTypeId: req.body.userTypeId,
    points: req.body.points,
  };

  if (!userData.name || !userData.number || !userData.userTypeId) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  User.create(userData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

exports.findAll = (req, res) => {
  User.scope("getMinUsers")
    .findAll({
      where: req.query,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.findOne = (req, res) => {
  User.findOne({
    where: req.query,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.update = (req, res) => {
  User.findOne({ where: req.params })
    .then((user) => {
      user.update({ ...req.body });
      return user;
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

// move points from user1 to user2
// exmp send: { id1: '1', id2: '2', give: '200' }
exports.exchangePoints = async (req, res) => {
  const { id1, id2, give } = req.body;

  const transaction = await db.sequelize.transaction();

  transaction.afterCommit(() => {
    res.send("exchange success");
  });

  try {
    const firstUser = await User.findOne(
      { where: { id: id1 } },
      { transaction: transaction }
    );
    if (!firstUser) {
      throw new Error();
    }
    await User.update(
      {
        points: +firstUser.points - give,
      },
      { where: { id: id1 }, transaction: transaction }
    );

    const secondUser = await User.findOne(
      { where: { id: id2 } },
      { transaction: transaction }
    );

    if (!secondUser.id) {
      throw new Error();
    }

    await User.update(
      {
        points: Number.parseInt(secondUser.points) + Number.parseInt(give),
      },
      { where: { id: id2 }, transaction: transaction }
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    res.send("exchange failed");
  }
};

exports.delete = (req, res) => {
  User.destroy({
    where: {
      ...req.params,
    },
    individualHooks: true,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};
