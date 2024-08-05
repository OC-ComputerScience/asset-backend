const { where } = require("sequelize");
const db = require("../models");
const AssetCategory = db.assetCategory;
const AssetType = db.assetType;
const AssetProfile = db.assetProfile;
const SerializedAsset = db.serializedAsset;

// Create and Save a new SerializedAsset
exports.createSerializedAsset = (req, res) => {
  // Validate request for required fields
  if (!req.body.serialNumber || !req.body.profileId) {
    res.status(400).send({
      message:
        "Content cannot be empty! Serial number, profile ID, and notes are required.",
    });
    return;
  }

  // Retrieve the associated AssetProfile
  AssetProfile.findByPk(req.body.profileId)
    .then((profile) => {
      if (!profile) {
        return res.status(404).send({ message: "AssetProfile not found." });
      }

      // Prepare data to create a SerializedAsset
      const serializedAssetData = {
        serialNumber: req.body.serialNumber,
        notes: req.body.notes,
        profileId: req.body.profileId,
        purchasePrice: req.body.purchasePrice || profile.purchasePrice, // Default to AssetProfile's price if not provided
        acquisitionDate: req.body.acquisitionDate || profile.acquisitionDate, // Default to AssetProfile's date if not provided
        activeStatus: req.body.activeStatus,
        disposalReason: req.body.disposalReason,
        checkoutStatus: req.body.checkoutStatus,
      };

      // Create a SerializedAsset in the database
      SerializedAsset.create(serializedAssetData)
        .then((data) => {
          res.status(201).json(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the SerializedAsset.",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Failed to retrieve AssetProfile.",
      });
    });
};

// Retrieve all SerializedAssets from the database.
exports.getAllSerializedAssets = (req, res) => {
  SerializedAsset.findAll({
    include: [
      {
        model: AssetProfile,
        as: "assetProfile",
        attributes: [
          "profileId",
          "profileName",
          "typeId",
          "purchasePrice",
          "acquisitionDate",
          "notes",
          "activeStatus",
        ],
      },
    ],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving serialized assets.",
      });
    });
};
// Retrieve all SerializedAssets from the database for Profile
exports.getAllSerializedAssetsForProfile = (req, res) => {
  const profleId = req.params.profileId;
  SerializedAsset.findAll({
    where: { profileId: profleId },
    include: [
      {
        model: AssetProfile,
        as: "assetProfile",
        attributes: [
          "profileId",
          "profileName",
          "typeId",
          "purchasePrice",
          "acquisitionDate",
          "notes",
          "activeStatus",
        ],
      },
    ],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving serialized assets.",
      });
    });
};
// Find a single SerializedAsset with a serializedAssetId
exports.getSerializedAssetById = (req, res) => {
  const serializedAssetId = req.params.serializedAssetId;

  SerializedAsset.findByPk(serializedAssetId, {
    include: [
      {
        model: AssetProfile,
        as: "assetProfile",
        attributes: [
          "profileId",
          "profileName",
          "typeId",
          "purchasePrice",
          "acquisitionDate",
          "notes",
          "activeStatus",
        ],
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send({
          message: `Cannot find SerializedAsset with serializedAssetId=${serializedAssetId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error retrieving SerializedAsset with serializedAssetId=" +
          serializedAssetId,
      });
    });
};

exports.getSerializedAssetsByCategoryId = (req, res) => {
  const categoryId = req.params.categoryId;

  SerializedAsset.findAll({
    include: [{
      model: AssetProfile,
      as: 'assetProfile',
      include: [{
        model: AssetType,
        as: 'assetType',
        where: { categoryId: categoryId },
        attributes: ['typeId'],
        include: [{
          model: AssetCategory,
          as: 'assetCategory',
          attributes: ['categoryId', 'categoryName', 'desc']
        }]
      }]
    }],
    where: {
      '$assetProfile.assetType.categoryId$': categoryId
    }
  })
  .then((profiles) => {
    if (profiles.length > 0) {
      res.status(200).json(profiles);
    } else {
      res.status(404).send({
        message: `No AssetProfiles found for categoryId=${categoryId}.`
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving AssetProfiles by category.",
    });
  });
};




// Update a SerializedAsset by the serializedAssetId in the request
exports.updateSerializedAsset = (req, res) => {
  const serializedAssetId = req.params.serializedAssetId;

  SerializedAsset.update(req.body, {
    where: { serializedAssetId: serializedAssetId },
  })
    .then((num) => {
      if (num[0] == 1) {
        res.status(200).send({
          message: "SerializedAsset was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update SerializedAsset with serializedAssetId=${serializedAssetId}. Maybe SerializedAsset was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error updating SerializedAsset with serializedAssetId=" +
          serializedAssetId,
      });
    });
};

// Delete a SerializedAsset with the specified serializedAssetId in the request
exports.deleteSerializedAsset = (req, res) => {
  const serializedAssetId = req.params.serializedAssetId;

  SerializedAsset.destroy({
    where: { serializedAssetId: serializedAssetId },
  })
    .then((num) => {
      if (num[0] == 1) {
        res.status(200).send({
          message: "SerializedAsset was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete SerializedAsset with serializedAssetId=${serializedAssetId}. Maybe it was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Could not delete SerializedAsset with serializedAssetId=" +
          serializedAssetId,
      });
    });
};

// Delete all SerializedAssets from the database.
exports.deleteAllSerializedAssets = (req, res) => {
  SerializedAsset.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.status(200).send({
        message: `${nums} SerializedAssets were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all serialized assets.",
      });
    });
};
