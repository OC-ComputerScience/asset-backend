module.exports = (app) => {
    const personAsset = require("../controllers/personAsset.controller.js");
    const buildingAsset = require("../controllers/buildingAsset.controller.js");
    const roomAsset = require("../controllers/roomAsset.controller.js");
    const person = require("../controllers/person.controller.js");
    const building = require("../controllers/building.controller.js");
    const room = require("../controllers/room.controller.js");

    const {authenticate} = require("../authorization/authorization.js");
    const router = require("express").Router();

    // Create
    router.post("/people", [authenticate], personAsset.createPersonAsset);
    router.post("/buildings", [authenticate], buildingAsset.createBuildingAsset);
    router.post("/rooms", [authenticate], roomAsset.createRoomAsset);

    router.get("/people", [authenticate], personAsset.getAllPersonAssets);
    router.get("/buildings", [authenticate], buildingAsset.getAllBuildingAssets);
    router.get("/rooms", [authenticate], roomAsset.getAllRoomAssets);

    // Get Recent
    router.get("/people/recent", [authenticate], personAsset.getAllRecentPersonAssets);
    router.get("/buildings/recent", [authenticate], buildingAsset.getRecentBuildingAssets);
    router.get("/rooms/recent", [authenticate], roomAsset.getRecentRoomAssets);

    // Get Recent by Category
    router.get("/people/category/:categoryId", [authenticate], personAsset.getRecentByCategoryId);
    router.get("/buildings/category/:categoryId", [authenticate], buildingAsset.getRecentByCategoryId);
    router.get("/rooms/category/:categoryId", [authenticate], roomAsset.getRecentByCategoryId);

    // Get Assignees
    router.get("/assignee/people", [authenticate], person.getAllPersons);
    router.get("/assignee/buildings", [authenticate], building.findAll);
    router.get("/assignee/rooms", [authenticate], room.getAllRooms);

    // Get One
    router.get("/people/:id", [authenticate], personAsset.getPersonAssetById);
    router.get("/buildings/:id", [authenticate], buildingAsset.getBuildingAssetById);
    router.get("/rooms/:id", [authenticate], roomAsset.getRoomAssetById);

    // Update
    router.put("/people/:personAssetId", [authenticate], personAsset.updatePersonAsset);
    router.put("/buildings/:buildingAssetId", [authenticate], buildingAsset.updateBuildingAsset);
    router.put("/rooms/:roomAssetId", [authenticate], roomAsset.updateRoomAsset);

    app.use("/asset-t1/assignment", router);
}