module.exports = (app) => {
    const warranty = require("../controllers/warranty.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new Warranty
    router.post("/", [authenticate], warranty.createWarranty);
  
    // Retrieve all Warranties
    router.get("/", [authenticate], warranty.getAllWarranties);
  
    // Retrieve a single Warranty by warrantyId
    router.get("/:warrantyId", [authenticate], warranty.getWarrantyById);

    //Retrieve all warranties with passed in serialAssetId
  router.get("/bySerializedAsset/:serializedAssetId", [authenticate], warranty.getWarrantiesBySerializedAssetId);

  
    // Update a Warranty by warrantyId
    router.put("/:warrantyId", [authenticate], warranty.updateWarranty);
  
    // Delete a Warranty by warrantyId
    router.delete("/:warrantyId", [authenticate], warranty.deleteWarranty);
  
    // Delete all Warranties
    router.delete("/", [authenticate], warranty.deleteAllWarranties);
  
    app.use("/asset-t1/warranty", router);
  };
  