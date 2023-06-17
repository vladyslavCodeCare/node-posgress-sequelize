const db = require("../../models");
const User = db.user;
const Op = db.Sequelize.Op;

/* 
params:
name req
info
number req 
userTypeId req
*/

exports.create = (req, res) => {
  const userData = {
    name: req.body.name,
    info: req.body.info,
    number: req.body.number,
    userTypeId: req.body.userTypeId,
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

exports.delete = (req, res) => {};
