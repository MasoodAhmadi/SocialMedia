const express = require("express");
//const { Model } = require("sequelize/types");
//const exports = express.exports();

const db = require("../models");
const tutorialModel = require("../models/tutorial.model");

const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

/* const findOne = (req, res) => {
   const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  const data = db.tutorials.findAll();
  return res.status(200).send(data);
}; */

const findOne = async (req, res) => {
  const data = await Tutorial.findAll();
  return res.status(200).send(data);
};

/* const createFile = (req, res) => {
  const { id } = req.body;
  const options = {
    title: req.body.title,
    description: req.body.description ? req.body.description : false,
  };

  const allData = Tutorial.create(options);

  res.status(200).send(allData);
}; */

const createFile = (req, res) => {
  // Create a Tutorial
  /* const any = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  }; */
  const { title } = req.body.title;
  const { description } = req.body.description;
  const itemVal = { title, description };

  const itemAll = tutorials.findAll({ where: itemVal });
  Tutorial.create(itemAll[1]);

  res
    .send(itemAll)

    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

module.exports = { createFile, findOne };
