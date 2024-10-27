const db = require("../models");
const Warranty = db.warranty;
const SerializedAsset = db.serializedAsset;
const AssetProfile = db.assetProfile;
const Op = db.Sequelize.Op;

// Create and Save a new Warranty
exports.createWarranty = (req, res) => {

  // Validate request
  if (
    !req.body.warrantyDescription ||
    !req.body.startDate ||
    !req.body.endDate ||
    !req.body.serializedAssetId
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Warranty
  const warranty = {

    warrantyDescription: req.body.warrantyDescription,
    warrantyNotes: req.body.warrantyNotes,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    length: req.body.length,
    serializedAssetId: req.body.serializedAssetId,
    activeStatus: req.body.activeStatus,
  };

  // Save Warranty in the database
  Warranty.create(warranty)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Warranty.",
      });
    });
};

// Retrieve all Warranties from the database.
exports.getAllWarranties = (req, res) => {
  Warranty.findAll({
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
        message:
          err.message || "Some error occurred while retrieving warranties.",
      });
    });
};

// Find a single Warranty with a warrantyId
exports.getWarrantyById = (req, res) => {
  const warrantyId = req.params.warrantyId;

  Warranty.findByPk(warrantyId,  {
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
          message: `Cannot find Warranty with warrantyId=${warrantyId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Warranty with warrantyId=" + warrantyId,
      });
    });
};

// Retrieve all Logs with a specific serializedAssetId
exports.getWarrantiesBySerializedAssetId = (req, res) => {
  const serializedAssetId = req.params.serializedAssetId;

  Warranty.findAll({ where: { serializedAssetId: serializedAssetId } })
    .then((data) => {
      if (data.length > 0) {
        res.status(200).json(data);
      } else {
        res.status(404).send({
          message: `No warranties found with serializedAssetId=${serializedAssetId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving warranties with serializedAssetId=" + serializedAssetId,
      });
    });
};

// Update a Warranty by the warrantyId in the request
exports.updateWarranty = (req, res) => {
  const warrantyId = req.params.warrantyId;

  Warranty.update(req.body, {
    where: { warrantyId: warrantyId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Warranty was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update warranty with warrantyId=${warrantyId}. Maybe Warranty was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Warranty with warrantyId=" + warrantyId,
      });
    });
};

// Delete a Warranty with the specified warrantyId in the request
exports.deleteWarranty = (req, res) => {
  const warrantyId = req.params.warrantyId;

  Warranty.destroy({
    where: { warrantyId: warrantyId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Warranty was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete warranty with warrantyId=${warrantyId}. Maybe Warranty was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Warranty with warrantyId=" + warrantyId,
      });
    });
};

// Delete all Warranties from the database.
exports.deleteAllWarranties = (req, res) => {
  Warranty.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res
        .status(200)
        .send({ message: `${nums} Warranties were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all warranties.",
      });
    });
};
