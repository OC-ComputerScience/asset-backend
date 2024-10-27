module.exports = (app) => {
    const roomAsset = require("../controllers/roomAsset.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new RoomAsset
    router.post("/", [authenticate], roomAsset.createRoomAsset);
  
    // Retrieve all RoomAssets
    router.get("/", [authenticate], roomAsset.getAllRoomAssets);

    // Retrieve recent RoomAssets
    router.get("/recent", [authenticate], roomAsset.getRecentRoomAssets);

    // Retrieve all roomAssets with matching serializedAssetId
    router.get("/bySerializedAsset/:serializedAssetId", [authenticate], roomAsset.getRoomAssetsBySerializedAssetId);

    //Retrieve recent room assets with categoryId 
    router.get("/byCategoryId/recent/:categoryId", [authenticate], roomAsset.getRecentByCategoryId);

    //Retrieve all room assets with categoryId 
    router.get("/byCategoryId/:categoryId", [authenticate], roomAsset.getRoomAssetsByCategoryId);

    // Retrieve a single RoomAsset by roomAssetId
    router.get("/:roomAssetId", [authenticate], roomAsset.getRoomAssetById);

    // Update a RoomAsset by roomAssetId
    router.put("/:roomAssetId", [authenticate], roomAsset.updateRoomAsset);
  
    // Delete a RoomAsset by roomAssetId
    router.delete("/:roomAssetId", [authenticate], roomAsset.deleteRoomAsset);
  
    app.use("/asset-t1/roomAsset", router);
  };
  