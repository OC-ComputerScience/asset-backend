module.exports = (app) => {
    const report = require("../controllers/report.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new Report
    router.post("/", [authenticate], report.createReport);
  
    // Retrieve all Reports
    router.get("/", [authenticate], report.getAllReports);
  
    // Retrieve a single Report by reportId
    router.get("/:reportId", [authenticate], report.getReportById);
  
    // Update a Report by reportId
    router.put("/:reportId", [authenticate], report.updateReport);
  
    // Delete a Report by reportId
    router.delete("/:reportId", [authenticate], report.deleteReport);
  
    app.use("/asset-t1/report", router);
};
