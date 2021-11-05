module.exports = (app) => {
  const items = require("../controller/items.controller.js");
  var router = require("express").Router();

  router.post("/", items.create);

  router.get("/", items.findAll);

  router.get("/selected", items.FindAllSelected);

  router.get("/:id", items.findOne);

  router.put(":id", items.update);

  router.delete("/:id", items.delete);

  app.use("/items", router);
};
