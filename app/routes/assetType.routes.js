module.exports = (app) => {
    const assetType = require("../controllers/assetType.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new AssetType
    router.post("/", [authenticate], assetType.createAssetType);

    // Bulk create from csv
    router.post("/file", [authenticate], assetType.bulkCreateAssetType)
  
    // Retrieve all AssetTypes
    router.get("/", [authenticate], assetType.getAllAssetTypes);
  
    // Retrieve a single AssetType by typeId
    router.get("/:typeId", [authenticate], assetType.getAssetTypeById);

    //Retrieve all asset types with categoryId 
    router.get("/byCategoryId/:categoryId", [authenticate], assetType.getAssetTypesByCategoryId);
  
    // Update an AssetType by typeId
    router.put("/:typeId", [authenticate], assetType.updateAssetType);
  
    // Delete an AssetType by typeId
    router.delete("/:typeId", [authenticate], assetType.deleteAssetType);
  
    // Delete all AssetTypes
    router.delete("/", [authenticate], assetType.deleteAllAssetTypes);
  
    app.use("/asset-t1/assetType", router);
  };
  