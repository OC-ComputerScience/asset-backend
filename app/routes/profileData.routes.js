module.exports = (app) => {
    const profileData = require("../controllers/profileData.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new ProfileData
    router.post("/", [authenticate], profileData.createProfileData);
  
    // Retrieve all ProfileData
    router.get("/", [authenticate], profileData.getAllProfileData);
  
    // Retrieve a single ProfileData by profileId
    router.get("/:profileDataId", [authenticate], profileData.getProfileDataById);
  
    // Retrieve ProfileData by profileId
    router.get("/byProfile/:profileId", [authenticate], profileData.getProfileDataByProfileId);

    // Update a ProfileData by profileId
    router.put("/:profileDataId", [authenticate], profileData.updateProfileData);
  
    // Delete a ProfileData by profileId
    router.delete("/byProfile/:profileId", [authenticate], profileData.deleteProfileDataByProfileId);
  
    // Delete all ProfileData
    router.delete("/", [authenticate], profileData.deleteAllProfileData);
  
    app.use("/asset-t1/profileData", router);
  };
  