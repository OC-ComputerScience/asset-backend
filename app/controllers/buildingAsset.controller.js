const db = require("../models");
const BuildingAsset = db.buildingAsset;
const Building = db.building;
const SerializedAsset = db.serializedAsset;
const AssetProfile = db.assetProfile;
const AssetType = db.assetType;
const AssetCategory = db.assetCategory;
const Op = db.Sequelize.Op;

// Create and Save a new BuildingAsset
exports.createBuildingAsset = (req, res) => {
  // Validate request
  if (
    !req.body.buildingId ||
    !req.body.serializedAssetId ||
    !req.body.checkoutDate ||
    !req.body.checkedOutBy
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a BuildingAsset
  const buildingAsset = {
    buildingId: req.body.buildingId,
    serializedAssetId: req.body.serializedAssetId,
    checkoutDate: req.body.checkoutDate,
    checkinDate: req.body.checkinDate,
    expectedCheckinDate: req.body.expectedCheckinDate,
    checkoutStatus: req.body.checkoutStatus,
    checkedOutBy: req.body.checkedOutBy,
  };

  // Save BuildingAsset in the database
  BuildingAsset.create(buildingAsset)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the BuildingAsset.",
      });
    });
};

exports.getAllBuildingAssets = (req, res) => {
  BuildingAsset.findAll({
    include: [
      {
        model: Building,
        as: "building",
        attributes: ["buildingId", "name", "abbreviation", "activeStatus"],
      },
      {
        model: SerializedAsset,
        as: "serializedAsset",
        include: [
          {
            // Include AssetProfile here
            model: AssetProfile,
            as: "assetProfile",
            attributes: ["profileId", "profileName", "typeId"],
          },
        ],
        attributes: [
          "serializedAssetId",
          "serialNumber",
          "profileId",
          "serializedAssetName",
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
          "Some error occurred while retrieving building assets.",
      });
    });
};

// Find a single BuildingAsset with a buildingAssetId
exports.getBuildingAssetById = (req, res) => {
  const buildingAssetId = req.params.buildingAssetId;

  BuildingAsset.findByPk(buildingAssetId, {
    include: [
      {
        model: Building,
        as: "building",
        attributes: ["buildingId", "name", "abbreviation", "activeStatus"],
      },
      {
        model: SerializedAsset,
        as: "serializedAsset",
        include: [
          {
            // Include AssetProfile here
            model: AssetProfile,
            as: "assetProfile",
            attributes: ["profileId", "profileName", "typeId"],
          },
        ],
        attributes: [
          "serializedAssetId",
          "serialNumber",
          "profileId",
          "serializedAssetName",
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
          message: `Cannot find BuildingAsset with buildingAssetId=${buildingAssetId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error retrieving BuildingAsset with buildingAssetId=" +
          buildingAssetId,
      });
    });
};

exports.getBuildingAssetsByCategoryId = (req, res) => {
  const categoryId = req.params.categoryId;

  BuildingAsset.findAll({
    include: [{
      model: Building,
      as: "building",
      attributes: ["buildingId", "name", "abbreviation", "activeStatus"],
    },{
    model: SerializedAsset,
    as: 'serializedAsset',
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
    }]
  }],
    where: {
      '$serializedAsset.assetProfile.assetType.categoryId$': categoryId
    }
  })
  .then((profiles) => {
    if (profiles.length > 0) {
      res.status(200).json(profiles);
    } else {
      res.status(404).send({
        message: `No Building Assets found for categoryId=${categoryId}.`
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving buildingAssets by category.",
    });
  });
};

// Update a BuildingAsset by the buildingAssetId in the request
exports.updateBuildingAsset = (req, res) => {
  const buildingAssetId = req.params.buildingAssetId;

  BuildingAsset.update(req.body, {
    where: { buildingAssetId: buildingAssetId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "BuildingAsset was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update building asset with buildingAssetId=${buildingAssetId}. Maybe BuildingAsset was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error updating BuildingAsset with buildingAssetId=" +
          buildingAssetId,
      });
    });
};

// Delete a BuildingAsset with the specified buildingAssetId in the request
exports.deleteBuildingAsset = (req, res) => {
  const buildingAssetId = req.params.buildingAssetId;

  BuildingAsset.destroy({
    where: { buildingAssetId: buildingAssetId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "BuildingAsset was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete building asset with buildingAssetId=${buildingAssetId}. Maybe BuildingAsset was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Could not delete BuildingAsset with buildingAssetId=" +
          buildingAssetId,
      });
    });
};

// Delete all BuildingAssets from the database.
exports.deleteAllBuildingAssets = (req, res) => {
  BuildingAsset.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res
        .status(200)
        .send({ message: `${nums} BuildingAssets were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all building assets.",
      });
    });
};

// Retrieve all BuildingAssets with a specific serializedAssetId
exports.getBuildingAssetsBySerializedAssetId = (req, res) => {
  const serializedAssetId = req.params.serializedAssetId;
  
  BuildingAsset.findAll({
    where: { serializedAssetId: serializedAssetId },
    include: [
      {
        model: Building,
        as: "building",
        attributes: [
          "buildingId",
          "name",
          "abbreviation",
          "activeStatus",
        ],
      },
      {
        model: SerializedAsset,
        as: "serializedAsset",
        attributes: [
          "serializedAssetId",
          "serialNumber",
          "profileId",
          "serializedAssetName",
          "notes",
          "activeStatus",
        ],
        include: [{
          model: AssetProfile,
          as: "assetProfile",
          attributes: ["profileName"]
        }]
      },
    ],
  })

  .then((data) => {
    console.log("Building asset controller received serializedAssetId: " + serializedAssetId);
    res.status(200).json(data); // Always return 200 status with the data, even if it's an empty array
  })
  .catch((err) => {
    console.error("Error retrieving BuildingAssets with serializedAssetId=" + serializedAssetId, err);
    res.status(500).send({
      message: "Error retrieving BuildingAssets with serializedAssetId=" + serializedAssetId,
    });
  });
};

