const { Router } = require("express");

const router = Router();

const usersController = require("../controllers/users.contoller");

router.get("/getusers", usersController.findOne);
router.post("/addusers", usersController.createOne);

module.exports = router;
