const db = require("../models");
const ProfileData = db.profileData;
const AssetProfile = db.assetProfile;
const Op = db.Sequelize.Op;

// Create and Save a new ProfileData
exports.createProfileData = (req, res) => {
  // Validate request
  if (!req.body.fieldValueId || !req.body.profileId) {
    res.status(400).send({
      message: `Field and profileId are required`,
    });
    return;
  }

  // Create a ProfileData
  const profileData = {
    fieldValueId: req.body.fieldValueId,
    profileId: req.body.profileId,
  };

  // Save ProfileData in the database
  ProfileData.create(profileData)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ProfileData.",
      });
    });
};

// Retrieve all ProfileData from the database.
exports.getAllProfileData = (req, res) => {
  ProfileData.findAll({
    include: [
      {
        model: AssetProfile,
        as: "assetProfile",
        attributes: ["profileId", "profileName", "typeId", "purchasePrice"],
      },
    ],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving profile data.",
      });
    });
};

// Find a single ProfileData with a profileId
exports.getProfileDataById = (req, res) => {
  const profileDataId = req.params.profileDataId;

  ProfileData.findByPk(profileDataId, {
    include: [
      {
        model: AssetProfile,
        as: "assetProfile",
        attributes: ["profileId", "profileName", "typeId", "purchasePrice"],
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send({
          message: `Cannot find ProfileData with profileDataId=${profileDataId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ProfileData with profileId=" + profileDataId,
      });
    });
};

// Get ProfileData for a Profile
exports.getProfileDataByProfileId = (req, res) => {
  const profileId = req.params.profileId;

  ProfileData.findAll({
    where: { profileId: profileId },
  })
    .then((data) => {
      if (data.length > 0) {
        // Check for empty array, not just falsy value
        res.status(200).json(data);
      } else {
        res.status(404).send({
          message: `Cannot find ProfileData with profileId=${profileId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving ProfileData with profileId=" + profileId,
      });
    });
};

// Update a ProfileData by the profileId in the request
exports.updateProfileData = (req, res) => {
  const profileDataId = req.params.profileDataId;

  ProfileData.update(req.body, {
    where: { profileDataId: profileDataId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "ProfileData was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update profile data with profileDataId=${profileDataId}. Maybe ProfileData was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ProfileData with profileId=" + profileDataId,
      });
    });
};

// Delete a ProfileData with the specified profileId in the request
exports.deleteProfileDataByProfileId = (req, res) => {
  const profileId = req.params.profileId;

  ProfileData.destroy({
    where: { profileId: profileId },
  })
    .then((num) => {
      if (num === 0) {
        res.status(404).send({
          message: `No ProfileData found with profileId=${profileId}.`,
        });
      } else {
        res.status(200).send({
          message: `${num} ProfileData records were successfully deleted.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Could not delete ProfileData with profileId=${profileId}. Error: ${err.message}`,
      });
    });
};

// Delete all ProfileData from the database.
exports.deleteAllProfileData = (req, res) => {
  ProfileData.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res
        .status(200)
        .send({ message: `${nums} ProfileData were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all profile data.",
      });
    });
};
