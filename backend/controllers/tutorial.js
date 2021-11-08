const db = require("../models");
const Tutorial = db.tutorials;

const findOne = async (req, res) => {
  const data = await Tutorial.findAll();
  return res.status(200).send(data);
};

const createPost = async (req, res) => {
  const { title, description } = req.body;
  const valueItem = { title, description };
  try {
    const post = await Tutorial.create(valueItem);
    return res.status(201).send(post);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { findOne, createPost };
