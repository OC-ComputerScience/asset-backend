const db = require("../models");
const Report = db.report;

// Create and Save a new Report
exports.createReport = (req, res) => {
  // Validate request
  if (!req.body.reportDate) {
    res.status(400).send({
      message: "Content cannot be empty! Report Date is required.",
    });
    return;
  }

  // Create a Report
  const report = {
    typeId: req.body.typeId,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    reportDate: req.body.reportDate,
    dateFilter: req.body.dateFilter,
    reportType: req.body.reportType,
  };

  // Save Report in the database
  Report.create(report)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Report.",
      });
    });
};

// Retrieve all Reports from the database including associated AssetType.
exports.getAllReports = (req, res) => {
  let whereCondition = {};
  if (req.query.reportType) {
    whereCondition.reportType = req.query.reportType;
  }

  Report.findAll({
    where: whereCondition,
    include: [
      {
        model: db.assetType,
        as: "assetType",
      },
    ],
    order: [["reportDate", "DESC"]],
    limit: 20,
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving reports.",
      });
    });
};

// Find a single Report with a reportId including AssetType
exports.getReportById = (req, res) => {
  const reportId = req.params.reportId;

  Report.findByPk(reportId, {
    include: [
      {
        model: db.assetType,
        as: "assetType",
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send({
          message: `Cannot find Report with reportId=${reportId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Report with reportId=" + reportId,
      });
    });
};

// Update a Report by the reportId in the request
exports.updateReport = (req, res) => {
  const reportId = req.params.reportId;

  Report.update(req.body, {
    where: { reportId: reportId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Report was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Report with reportId=${reportId}. Maybe Report was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Report with reportId=" + reportId,
      });
    });
};

// Delete a Report with the specified reportId in the request
exports.deleteReport = (req, res) => {
  const reportId = req.params.reportId;

  Report.destroy({
    where: { reportId: reportId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Report was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete Report with reportId=${reportId}. Maybe Report was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Report with reportId=" + reportId,
      });
    });
};
