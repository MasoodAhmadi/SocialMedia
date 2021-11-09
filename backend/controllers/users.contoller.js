const db = require("../models");

const USERS = db.users;

const findOne = async (req, res) => {
  const data = await USERS.findAll();
  return res.status(200).send(data);
};

const createOne = async (req, res) => {
  try {
    const data = await USERS.create(req.body);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).json({ error: "cannot create user try again!" });
  }
};

module.exports = { findOne, createOne };
