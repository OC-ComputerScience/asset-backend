module.exports = (app) => {
    const personAsset = require("../controllers/personAsset.controller.js");
    const buildingAsset = require("../controllers/buildingAsset.controller.js");
    const roomAsset = require("../controllers/roomAsset.controller.js");

    const {authenticate} = require("../authorization/authorization.js");
    const router = require("express").Router();

    // Create
    router.post("/people", [authenticate], personAsset.createPersonAsset);
    router.post("/buildings", [authenticate], buildingAsset.createBuildingAsset);
    router.post("/rooms", [authenticate], roomAsset.createRoomAsset);

    // Get Recent
    router.get("/people", [authenticate], personAsset.getAllRecentPersonAssets);
    router.get("/buildings", [authenticate], buildingAsset.getRecentBuildingAssets);
    router.get("/rooms", [authenticate], roomAsset.getRecentRoomAssets);

    // Get Recent by Category
    router.get("/people/category/:categoryId", [authenticate], personAsset.getRecentByCategoryId);
    router.get("/buildings/category/:categoryId", [authenticate], buildingAsset.getRecentByCategoryId);
    router.get("/rooms/category/:categoryId", [authenticate], roomAsset.getRecentByCategoryId);

    // Get One
    router.get("/people/:id", [authenticate], personAsset.getPersonAssetById);
    router.get("/buildings/:id", [authenticate], buildingAsset.getBuildingAssetById);
    router.get("/rooms/:id", [authenticate], roomAsset.getRoomAssetById);

    // Update
    router.put("/people/:id", [authenticate], personAsset.updatePersonAsset);
    router.put("/buildings/:id", [authenticate], buildingAsset.updateBuildingAsset);
    router.put("/rooms/:id", [authenticate], roomAsset.updateRoomAsset);

    app.use("/asset-t1/assignment", router);
}