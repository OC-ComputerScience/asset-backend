const db = require("../models");
const Log = db.log;
const SerializedAsset = db.serializedAsset;
const AssetProfile = db.assetProfile;
const Op = db.Sequelize.Op;

// Create and Save a new Log
exports.createLog = (req, res) => {
  // Validate request
  if (!req.body.serializedAssetId || !req.body.serviceDate) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Log
  const log = {
    logId: req.body.logId,
    serializedAssetId: req.body.serializedAssetId,
    serviceDate: req.body.serviceDate,
    notes: req.body.notes,
    performedBy: req.body.performedBy,
    isPreventative: req.body.isPreventative,
    isRepair: req.body.isRepair,
    isUpgrade: req.body.isUpgrade,

  };

  // Save Log in the database
  Log.create(log)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Log.",
      });
    });
};

// Retrieve all Logs from the database.
exports.getAllLogs = (req, res) => {
  Log.findAll({
    include: [
      {
        model: SerializedAsset,
        as: "serializedAsset",
        include: [
          {
            model: AssetProfile,
            as: "assetProfile",
            attributes: ["profileId", "profileName"],
          },
        ],
        attributes: [
          "serializedAssetId",
          "serializedAssetName",
          "profileId",
          "serialNumber",
        ],
       
      }
      ]


  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving logs.",
      });
    });
};

// Find a single Log with a logId
exports.getLogById = (req, res) => {
  const logId = req.params.logId;

  Log.findByPk(logId, {
    include: [
      {
        model: SerializedAsset,
        as: "serializedAsset",
        include: [
          {
            model: AssetProfile,
            as: "assetProfile",
            attributes: ["profileName"],
          },
        ],
        attributes: [
          "serializedAssetName",
          "serializedAssetId",
          "serialNumber",
        ],
      }
      ]
  })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send({
          message: `Cannot find Log with logId=${logId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Log with logId=" + logId,
      });
    });
};

// Retrieve all Logs with a specific serializedAssetId
exports.getLogsBySerializedAssetId = (req, res) => {
  const serializedAssetId = req.params.serializedAssetId;
  console.log("Log controller recieved serializedAssetId: " + serializedAssetId)

  Log.findAll({ where: { serializedAssetId: serializedAssetId } })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).send({
          message: `No logs found with serializedAssetId=${serializedAssetId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Logs with serializedAssetId=" + serializedAssetId,
      });
    });
};


// Update a Log by the logId in the request
exports.updateLog = (req, res) => {
  const logId = req.params.logId;

  Log.update(req.body, {
    where: { logId: logId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Log was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update log with logId=${logId}. Maybe Log was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Log with logId=" + logId,
      });
    });
};

// Delete a Log with the specified logId in the request
exports.deleteLog = (req, res) => {
  const logId = req.params.logId;

  Log.destroy({
    where: { logId: logId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Log was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete log with logId=${logId}. Maybe Log was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Log with logId=" + logId,
      });
    });
};

// Delete all Logs from the database.
exports.deleteAllLogs = (req, res) => {
  Log.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res
        .status(200)
        .send({ message: `${nums} Logs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all logs.",
      });
    });
};
