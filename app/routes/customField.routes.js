module.exports = (app) => {
    const customField = require("../controllers/customField.controller.js");
    const {authenticate} = require("../authorization/authorization.js");
    const router = require("express").Router();

    router.post("/", customField.create);

    router.get("/", customField.findAll);

    router.get("/:id", customField.findOne);

    router.put("/:id", customField.update);

    router.delete("/:id", customField.delete);

    router.delete("/", customField.deleteAll);

    app.use("/asset-t1/customField", router);
};