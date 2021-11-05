module.exports = (app) => {
  const options = require("../controller/tutorial.controller.js");
  var router = require("express").Router();

  router.post("/", options.create);

  router.get("/", options.findAll);

  router.get("/published", options.FindAllPublished);

  router.get("/:id", options.findOne);

  router.put(":id", options.update);

  router.delete("/:id", options.delete);

  router.delete("/", options.deleteAll);

  app.use("/tutorials", router);
};
