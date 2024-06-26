module.exports = (app) => {
    const serializedAsset = require("../controllers/serializedAsset.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new SerializedAsset
    router.post("/", [authenticate], serializedAsset.createSerializedAsset);
  
    // Retrieve all SerializedAssets
    router.get("/", [authenticate], serializedAsset.getAllSerializedAssets);
  
    // Retrieve a single SerializedAsset by serializedAssetId
    router.get("/:serializedAssetId", [authenticate], serializedAsset.getSerializedAssetById);
  
    //Retrieve all asset profiles with categoryId 
    router.get("/byCategoryId/:categoryId", [authenticate], serializedAsset.getSerializedAssetsByCategoryId);

    // Update a SerializedAsset by serializedAssetId
    router.put("/:serializedAssetId", [authenticate], serializedAsset.updateSerializedAsset);
  
    // Delete a SerializedAsset by serializedAssetId
    router.delete("/:serializedAssetId", [authenticate], serializedAsset.deleteSerializedAsset);
  
    // Delete all SerializedAssets
    router.delete("/", [authenticate], serializedAsset.deleteAllSerializedAssets);
  
    app.use("/asset-t1/serializedAsset", router);
  };
  