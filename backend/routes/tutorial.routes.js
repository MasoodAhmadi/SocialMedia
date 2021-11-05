const express = require("express");
const router = express.Router();

const tutorials = require("../controllers/tutorial.contoller");

router.get("/allData", tutorials.findOne);
router.post("/upload", tutorials.createFile);
module.exports = router;

//easy way to test api

/* const Tutorial = db.tutorials; */
/* router.get("/all", async (req, res) => {
  const all = await Tutorial.findAll();
  res.status(200).send(all);
}); */
