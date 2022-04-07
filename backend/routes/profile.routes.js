const router = require("express").Router();
const db = require("../models");

const { Profile } = db;

router.get("/", async (req, res, next) => {
  try {
    const profiles = await Profile.findAll({});
    res.status(200).json(profiles);
  } catch (error) {
    console.log("error happened!", error);
  }
});
