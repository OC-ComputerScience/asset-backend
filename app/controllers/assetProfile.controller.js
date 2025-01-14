const db = require("../models");
const AssetProfile = db.assetProfile;
const AssetType = db.assetType;
const AssetCategory = db.assetCategory;
// Create and Save a new AssetProfile
exports.createAssetProfile = (req, res) => {
  // Validate request
  if (!req.body.typeId || !req.body.profileName) {
    res.status(400).send({
      message:
        "Content cannot be empty! Type ID and Profile Name are required.",
    });
    return;
  }

  // Create an AssetProfile
  const assetProfile = {
    profileName: req.body.profileName,
    typeId: req.body.typeId,
    purchasePrice: req.body.purchasePrice,
    acquisitionDate: new Date(req.body.acquisitionDate),
    activeStatus: 1,
    notes: req.body.notes,
    warrantyStartDate: req.body.warrantyStartDate,
    warrantyEndDate: req.body.warrantyEndDate,
    warrantyDescription: req.body.warrantyDescription,
    warrantyNotes: req.body.warrantyNotes,
    features: req.body.features,
    accessories: req.body.accessories,
  };

  // Save AssetProfile in the database
  AssetProfile.create(assetProfile)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {

      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the AssetProfile.",
      });
    });
};

// Retrieve all AssetProfiles from the database.
exports.getAllAssetProfiles = (req, res) => {
  AssetProfile.findAll({
    include: [
      {
        model: AssetType,
        as: "assetType", // Must match the alias defined in the association
        attributes: [
          "typeId",
          "typeName",
          "categoryId",
          "desc",
          "dynamicFields",
        ], // Specify the attributes you want to include
      },
    ],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving asset profiles.",
      });
    });
};

// Find a single AssetProfile with a profileId
exports.getAssetProfileById = (req, res) => {
  const profileId = req.params.profileId;

  AssetProfile.findByPk(profileId, {
    include: [
      {
        model: AssetType,
        as: "assetType",
        attributes: [
          "typeId",
          "typeName",
          "categoryId",
          "desc",
         
        ],
      },
      {
        model: db.profileData,
        required: false,
        include: [ 
          {
            model: db.customFieldValue,
            include: [
              { model: db.customField, include: [db.customFieldType]}
            ]
          },
       ]
      },
    ],
  })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).send({
          message: `Cannot find AssetProfile with profileId=${profileId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving AssetProfile with profileId=" + profileId,
      });
    });
};

exports.getAllForType = async(req, res) => {
  const typeId = req.params.typeId;
  try{
    const data = await AssetProfile.findAll({
      where: {typeId: typeId}
    });
    res.send(data);
  }
  catch(err){
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving asset profiles with type id=" + typeId
    });
  }
}

//get profiles by their respective types categoryId
exports.getProfilesByCategoryId = (req, res) => {
  const categoryId = req.params.categoryId;

  AssetProfile.findAll({
    include: [
      {
        model: AssetType,
        as: "assetType",
        where: { categoryId: categoryId },
        include: [
          {
            model: AssetCategory,
            as: "assetCategory",
            attributes: ["categoryId", "categoryName", "desc"],
          },
        ],
      },
    ],
  })
    .then((profiles) => {
      if (profiles.length > 0) {
        res.status(200).json(profiles);
      } else {
        res.status(404).send({
          message: `No AssetProfiles found for categoryId=${categoryId}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving AssetProfiles by category.",
      });
    });
};

// Update an AssetProfile by the profileId in the request
exports.updateAssetProfile = (req, res) => {
  const profileId = req.params.profileId;

  AssetProfile.update(req.body, {
    where: { profileId: profileId },
  })
    .then((num) => {
      if (num == 1 || num == 0) {
        res.status(200).send({
          message: "AssetProfile was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update AssetProfile with profileId=${profileId}. Maybe AssetProfile was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating AssetProfile with profileId=" + profileId,
      });
    });
};

// Delete an AssetProfile with the specified profileId in the request
exports.deleteAssetProfile = (req, res) => {
  const profileId = req.params.profileId;

  AssetProfile.destroy({
    where: { profileId: profileId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "AssetProfile was deleted successfully!",
        });
      } else {
        res.status(404).send({
          message: `Cannot delete asset profile with profileId=${profileId}. Maybe AssetProfile was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete AssetProfile with profileId=" + profileId,
      });
    });
};

// Delete all AssetProfiles from the database.
exports.deleteAllAssetProfiles = (req, res) => {
  AssetProfile.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res
        .status(200)
        .send({ message: `${nums} AssetProfiles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all asset profiles.",
      });
    });
};

// Bulk create assetProfiles from tsv
exports.bulkCreateAssetProfile = (req, res) => {
  // tsv will be read in as hex values
  // convert function that takes hex => utf8 characters
  const convert = function (tsvFile) {
    const convert = (from, to) => (str) => Buffer.from(str, from).toString(to);
    const hexToUtf8 = convert("hex", "utf8");
    let tsvData = hexToUtf8(tsvFile.data).split("\r\n");
  
    let tsvRows = [];
    tsvData.forEach((data) => {
      tsvRows.push(data.split("\t"));
    });
    let data = [];
    for (let i = 1; i < tsvRows.length; ++i) {
      let dict = {};
      for (let j = 0; j < tsvRows[i].length; ++j) {
        dict[tsvRows[0][j]] = tsvRows[i][j];
      }
      data.push(dict);
    }
    return data;
  };

  if (!req.files || !req.files.file) {
    res.status(404).send("File not found");
    return;
  }

  if (req.files.file.mimetype !== "text/tab-separated-values") {
    res.status(422).send(
      util.apiResponse(0, toast.INVALID_FILE_FORMAT, {
        err: "File format is not valid",
      })
    );
    return;
  }

  const tsvFile = req.files.file;
  data = convert(tsvFile); // pass tsv file to be converted


  AssetProfile.bulkCreate(data)
    .then((profiles) => {
      res.status(201).json(profiles);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Some error occurred while bulk creating the AssetProfiles.",
      });
    });
};
