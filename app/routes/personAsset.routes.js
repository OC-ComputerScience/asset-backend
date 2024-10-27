
module.exports = (app) => {
    const personAsset = require("../controllers/personAsset.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new PersonAsset
    router.post("/", [authenticate], personAsset.createPersonAsset);
  
    // Retrieve all PersonAsset
    router.get("/", [authenticate], personAsset.getAllPersonAssets);

    // Retrieve all rencentPersonAsset
    router.get("/recent", [authenticate], personAsset.getAllRecentPersonAssets);

    //Retrieve all recent asset profiles with categoryId 
    router.get("/byCategoryId/recent/:categoryId", [authenticate], personAsset.getRecentByCategoryId);

    //Retrieve all asset profiles with categoryId 
    router.get("/byCategoryId/:categoryId", [authenticate], personAsset.getPersonAssetsByCategoryId);
 
    // Retrieve all personAssets with matching serializedAssetId
    router.get("/bySerializedAsset/:serializedAssetId", [authenticate], personAsset.getPersonAssetsBySerializedAssetId);

    // Retrieve all personAssets check-in dates for reminder email
    router.get("/byCheckinDate/reminders", [authenticate], personAsset.getPersonAssetForReminder);
       
    // Retrieve a single  PersonAsset by  PersonAssetId
      router.get("/:personAssetId", [authenticate], personAsset.getPersonAssetById);

    router.get("/person/:personId", [authenticate], personAsset.getByPersonId);

    // Update a  PersonAsset by  PersonAssetId
    router.put("/:personAssetId", [authenticate], personAsset.updatePersonAsset);
  
    // Delete a  PersonAsset by  PersonAssetId
    router.delete("/:personAssetId", [authenticate], personAsset.deletePersonAsset);
  
    // Delete all  PersonAsset
    router.delete("/", [authenticate], personAsset.deleteAllPersonAssets);
  
    app.use("/asset-t1/personAsset", router);
  };
  