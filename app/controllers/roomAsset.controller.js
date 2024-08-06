const Sequalize = require("sequelize");
const db = require("../models");
const RoomAsset = db.roomAsset;
const Room = db.room;
const Building = db.building;
const SerializedAsset = db.serializedAsset;
const AssetProfile = db.assetProfile;
const AssetType = db.assetType;
const AssetCategory = db.assetCategory;
const Op = db.Sequelize.Op;

// Create and Save a new RoomAsset
exports.createRoomAsset = (req, res) => {
  // Validate request
  if (
    !req.body.roomId ||
    !req.body.serializedAssetId ||
    !req.body.checkoutDate ||
    !req.body.checkedOutBy
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a RoomAsset
  const roomAsset = {
    roomId: req.body.roomId,
    serializedAssetId: req.body.serializedAssetId,
    checkoutDate: req.body.checkoutDate,
    checkinDate: req.body.checkinDate,
    expectedCheckinDate: req.body.expectedCheckinDate,
    checkoutStatus: req.body.checkoutStatus,
    checkedOutBy: req.body.checkedOutBy,
  };

  // Save RoomAsset in the database
  RoomAsset.create(roomAsset)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the RoomAsset.",
      });
    });
};

// Retrieve all RoomAssets from the database.
exports.getAllRoomAssets = (req, res) => {
  const checkedOut = req.query.checkedOut;
  const checkedOutWhere = checkedOut ? { checkoutStatus: true } : {};
  RoomAsset.findAll({
    where: checkedOutWhere,
    include: [
      {
        model: Room,
        as: "room",
        include: [
          {
            // Include Building here
            model: Building,
            as: "building",
            attributes: ["buildingId", "abbreviation"],
          },
        ],
       
        attributes: [
          "roomId",
          "roomNo",
          "roomName",
          "buildingId",
          "activeStatus",
        ],
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
          err.message || "Some error occurred while retrieving room assets.",
      });
    });
};
// Retrieve all recentRoomAssets from the database.
exports.getRecentRoomAssets = (req, res) => {
  RoomAsset.findAll({
    where:
    {
      [Op.or]: [
      {checkoutDate: {
        [Op.gte]: Sequalize.literal("NOW() - INTERVAL '28' DAY")
      }},
      {checkinDate: {
        [Op.gte]: Sequalize.literal("NOW() - INTERVAL '28' DAY")
      }}
    ]
    },
    include: [
      {
        model: Room,
        as: "room",
        include: [
          {
            // Include Building here
            model: Building,
            as: "building",
            attributes: ["buildingId", "abbreviation"],
          },
        ],
        attributes: [
          "roomId",
          "roomNo",
          "roomName",
          "buildingId",
          "activeStatus",
        ],
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
          err.message || "Some error occurred while retrieving room assets.",
      });
    });
};


// Find a single RoomAsset with a roomAssetId
exports.getRoomAssetById = (req, res) => {
  const roomAssetId = req.params.roomAssetId;

  RoomAsset.findByPk(roomAssetId, {
    include: [
      {
        model: Room,
        as: "room",
        attributes: ["roomId", "roomNo", "buildingId", "activeStatus"],
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
          message: `Cannot find RoomAsset with roomAssetId=${roomAssetId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving RoomAsset with roomAssetId=" + roomAssetId,
      });
    });
};
// Find a  RoomAsset with specfice categlory
exports.getRoomAssetsByCategoryId = (req, res) => {
  const categoryId = req.params.categoryId;

  RoomAsset.findAll({
    include: [
      {
        model: Room,
        as: "room",
        include: [
          {
            // Include Building here
            model: Building,
            as: "building",
            attributes: ["buildingId", "abbreviation"],
          },
        ],
        attributes: [
          "roomId",
          "roomNo",
          "roomName",
          "buildingId",
          "activeStatus",
        ],
      },
    {
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
        message: `No Room Assets found for categoryId=${categoryId}.`
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving roomAssets AssetProfiles by category.",
    });
  });
};
// Find recent  RoomAsset with specfice categlory
exports.getRecentByCategoryId = (req, res) => {
  const categoryId = req.params.categoryId;

  RoomAsset.findAll({
    include: [
      {
        model: Room,
        as: "room",
        include: [
          {
            // Include Building here
            model: Building,
            as: "building",
            attributes: ["buildingId", "abbreviation"],
          },
        ],
        attributes: [
          "roomId",
          "roomNo",
          "roomName",
          "buildingId",
          "activeStatus",
        ],
      },
    {
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
      '$serializedAsset.assetProfile.assetType.categoryId$': categoryId,
      [Op.or]: [
        {checkoutDate: {
          [Op.gte]: Sequalize.literal("NOW() - INTERVAL '28' DAY")
        }},
        {checkinDate: {
          [Op.gte]: Sequalize.literal("NOW() - INTERVAL '28' DAY")
        }}
      ]
      
    }
  })
  .then((profiles) => {
    if (profiles.length > 0) {
      res.status(200).json(profiles);
    } else {
      res.status(404).send({
        message: `No Room Assets found for categoryId=${categoryId}.`
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving roomAssets AssetProfiles by category.",
    });
  });
};
// Update a RoomAsset by the roomAssetId in the request
exports.updateRoomAsset = (req, res) => {
  const roomAssetId = req.params.roomAssetId;

  RoomAsset.update(req.body, {
    where: { roomAssetId: roomAssetId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "RoomAsset was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update room asset with roomAssetId=${roomAssetId}. Maybe RoomAsset was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating RoomAsset with roomAssetId=" + roomAssetId,
      });
    });
};

// Delete a RoomAsset with the specified roomAssetId in the request
exports.deleteRoomAsset = (req, res) => {
  const roomAssetId = req.params.roomAssetId;

  RoomAsset.destroy({
    where: { roomAssetId: roomAssetId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "RoomAsset was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete room asset with roomAssetId=${roomAssetId}. Maybe RoomAsset was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete RoomAsset with roomAssetId=" + roomAssetId,
      });
    });
};

// Retrieve all RoomAssets with a specific serializedAssetId
exports.getRoomAssetsBySerializedAssetId = (req, res) => {
  const serializedAssetId = req.params.serializedAssetId;

  RoomAsset.findAll({
    where: { serializedAssetId: serializedAssetId },
    include: [
      {
        model: Room,
        as: "room",
        attributes: ["roomId", "roomNo", "buildingId", "activeStatus"],
        include: [
          {
            model: Building,
            as: "building",
            attributes: ["name"],
          },
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
        include: [
          {
            model: AssetProfile,
            as: "assetProfile",
            attributes: ["profileName"],
          },
        ],
      },
    ],
  })
    .then((data) => {
      console.log(
        "Room asset controller received serializedAssetId: " + serializedAssetId
      );
      res.status(200).json(data); // Always return 200 status with the data, even if it's an empty array
    })
    .catch((err) => {
      console.error(
        "Error retrieving RoomAssets with serializedAssetId=" +
          serializedAssetId,
        err
      );
      res.status(500).send({
        message:
          "Error retrieving RoomAssets with serializedAssetId=" +
          serializedAssetId,
      });
    });
};
