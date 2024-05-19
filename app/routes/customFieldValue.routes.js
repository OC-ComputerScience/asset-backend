module.exports = (app) => {
    const customFieldValue = require("../controllers/customFieldValue.controller.js");
    const {authenticate} = require("../authorization/authorization.js");
    const router = require("express").Router();

    router.post("/", [authenticate], customFieldValue.create);

    router.get("/", [authenticate], customFieldValue.findAll);

    router.get("/:id", [authenticate], customFieldValue.findOne);

    router.put("/:id", [authenticate], customFieldValue.update);

    router.delete("/:id", [authenticate], customFieldValue.delete);

    router.delete("/", [authenticate], customFieldValue.deleteAll);

    app.use("/asset-t1/customFieldValue", router);
};