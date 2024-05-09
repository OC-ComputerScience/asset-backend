const db = require("../models");
const PersonAsset = db.personAsset;
const Person = db.person;
const SerializedAsset = db.serializedAsset;
const AssetProfile = db.assetProfile;
const AssetType = db.assetType;
const AssetCategory = db.assetCategory;
const Op = db.Sequelize.Op;

// Create and Save a new PersonAsset
exports.createPersonAsset = (req, res) => {
  // Validate request
  if (
    !req.body.serializedAssetId ||
    !req.body.personId ||
    !req.body.checkoutDate ||
    !req.body.checkedOutBy
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a PersonAsset
  const personAsset = {
    personId: req.body.personId,
    serializedAssetId: req.body.serializedAssetId,
    checkoutDate: req.body.checkoutDate,
    checkinDate: req.body.checkinDate,
    expectedCheckinDate: req.body.expectedCheckinDate,
    checkoutStatus: req.body.checkoutStatus,
    checkedOutBy: req.body.checkedOutBy,
  };

  // Save PersonAsset in the database
  PersonAsset.create(personAsset)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the PersonAsset.",
      });
    });
};

// Retrieve all PersonAssets from the database.
exports.getAllPersonAssets = (req, res) => {
  PersonAsset.findAll({
    include: [
      {
        model: Person,
        as: "person",
        attributes: [
          "personId",
          "fullName",
          "fullNameWithId",
          "fName",
          "lName",
          "email",
          "idNumber",
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
          err.message || "Some error occurred while retrieving person assets.",
      });
    });
};

// Find a single PersonAsset with a personAssetId
exports.getPersonAssetById = (req, res) => {
  const personAssetId = req.params.personAssetId;

  PersonAsset.findByPk(personAssetId, {
    include: [
      {
        model: Person,
        attributes: [
          "personId",
          "fName",
          "lName",
          "email",
          "idNumber",
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
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send({
          message: `Cannot find PersonAsset with personAssetId=${personAssetId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error retrieving PersonAsset with personAssetId=" + personAssetId,
      });
    });
};

exports.getPersonAssetsByCategoryId = (req, res) => {
  const categoryId = req.params.categoryId;

  PersonAsset.findAll({
    include: [{
        model: Person,
        as: "person",
        attributes: [
          "personId",
          "fullName",
          "fullNameWithId",
          "fName",
          "lName",
          "email",
          "idNumber",
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
        message: `No personAssets found for categoryId=${categoryId}.`
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving PersonAssets by category.",
    });
  });
};


// Getter function for reminder emails
// Getter function for reminder emails
exports.getPersonAssetForReminder = () => {
  return new Promise((resolve, reject) => {
    const today = new Date();
    const daysFromDue = new Date(today);
    daysFromDue.setDate(today.getDate() + 3); // value can be changed for any range

    PersonAsset.findAll({
      where: {
        expectedCheckinDate: {
          [Op.between]: [today, daysFromDue],
        },
      },
      include: [
        {
          model: Person,
          as: "person",
          attributes: [
            "personId",
            "fName",
            "lName",
            "email",
            "idNumber",
            "activeStatus",
          ],
        },
        {
          model: SerializedAsset,
          as: "serializedAsset",
          include: [
            {
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
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// Update a PersonAsset by the personAssetId in the request
exports.updatePersonAsset = (req, res) => {
  const personAssetId = req.params.personAssetId;

  PersonAsset.update(req.body, {
    where: { personAssetId: personAssetId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "PersonAsset was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update person asset with personAssetId=${personAssetId}. Maybe PersonAsset was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error updating PersonAsset with personAssetId=" + personAssetId,
      });
    });
};

// Delete a PersonAsset with the specified personAssetId in the request
exports.deletePersonAsset = (req, res) => {
  const personAssetId = req.params.personAssetId;

  PersonAsset.destroy({
    where: { personAssetId: personAssetId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "PersonAsset was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete person asset with personAssetId=${personAssetId}. Maybe PersonAsset was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Could not delete PersonAsset with personAssetId=" + personAssetId,
      });
    });
};

// Delete all PersonAssets from the database.
exports.deleteAllPersonAssets = (req, res) => {
  PersonAsset.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res
        .status(200)
        .send({ message: `${nums} PersonAssets were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all person assets.",
      });
    });
};

// Retrieve all PersonAssets with a specific serializedAssetId
exports.getPersonAssetsBySerializedAssetId = (req, res) => {
  const serializedAssetId = req.params.serializedAssetId;
  console.log("Controller recieved serializedAssetId" + serializedAssetId)
  PersonAsset.findAll({
    where: { serializedAssetId: serializedAssetId },
    include: [
      {
        model: Person,
        as: "person",
        attributes: [
          "personId",
          "fName",
          "lName",
          "email",
          "idNumber",
          "activeStatus",
        ],
      }
    ]
  })
  .then((data) => {
    console.log("Person asset controller received serializedAssetId: " + serializedAssetId);
    res.status(200).json(data); // Always return 200 status with the data, even if it's an empty array
  })
  .catch((err) => {
    console.error("Error retrieving PersonAssets with serializedAssetId=" + serializedAssetId, err);
    res.status(500).send({
      message: "Error retrieving PersonAssets with serializedAssetId=" + serializedAssetId,
    });
  });
};


