const { Router } = require("express");

const router = Router();
const tutorials = require("../controllers/tutorial");

router.get("/getAll", tutorials.findOne);
router.post("/add", tutorials.createPost);

module.exports = router;
