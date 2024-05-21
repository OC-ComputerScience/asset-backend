module.exports = (app) => {
    const customFieldType = require("../controllers/customFieldType.controller.js");
    const {authenticate} = require("../authorization/authorization.js");
    const router = require("express").Router();

    router.post("/", [authenticate], customFieldType.create);

    router.get("/", [authenticate], customFieldType.findAll);

    router.get("/:id", [authenticate], customFieldType.findOne);

    router.put("/:id", [authenticate], customFieldType.update);

    router.delete("/:id", [authenticate], customFieldType.delete);

    router.delete("/", [authenticate], customFieldType.deleteAll);

    app.use("/asset-t1/customFieldType", router);
};