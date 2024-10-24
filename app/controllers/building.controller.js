const db = require("../models");
const Building = db.building;
const Room = db.room;
const Op = db.Sequelize.Op;

// Create and Save a new Building
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a Building
  const building = {
    buildingId: req.body.buildingId,
    name: req.body.name,
    abbreviation: req.body.abbreviation,
    activeStatus: req.body.activeStatus,
    yearBuilt: req.body.yearBuilt,
    squareFeet: req.body.squareFeet,
    numStories: req.body.numStories,
    hasElevator: req.body.hasElevator,
    hasFireMonitor: req.body.hasFireMonitor, 
    hasSmokeAlarm: req.body.hasSmokeAlarm,
    constructionType: req.body.constructionType, 
    buildingValue: req.body.buildingValue,
    buildingBPP: req.body.buildingBPP

  };
  // Save Building in the database
  Building.create(building)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Building.",
      });
    });
};

// Retrieve all Buildings from the database.
exports.findAll = (req, res) => {
  const buildingId = req.query.buildingId;
  var condition = buildingId ? { buildingId: { [Op.like]: `%${buildingId}%` } } : null;

  Building.findAll({
    where: condition,
    include: [{
      model: Room,
      attributes: [],
      required: false, // Important to ensure buildings with no rooms are included
      where: {
        activeStatus: true // Only include rooms that are active
      },
    }],
    attributes: {
      include: [
        [db.Sequelize.fn('COUNT', db.Sequelize.col('rooms.roomId')), 'noOfRooms']
      ]
    },
    group: ['building.buildingId']
  })
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving buildings.",
    });
  });
};


// Find a single Building with a buildingId
exports.findOne = (req, res) => {
  const buildingId = req.params.buildingId;

  Building.findByPk(buildingId, {
    include: [{
      model: Room,
      attributes: [],
      required: false, // Important to ensure buildings with no rooms are included
      where: {
        activeStatus: true // Only include rooms that are active
      },
    }],
    attributes: {
      include: [
        [db.Sequelize.fn('COUNT', db.Sequelize.col('rooms.roomId')), 'noOfRooms']
      ]
    },
    group: ['building.buildingId']
  })
  .then((data) => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Building with buildingId=${buildingId}.`,
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: "Error retrieving Building with buildingId=" + buildingId,
    });
  });
};

// Find a single Building with a name
exports.findByName = (req, res) => {
  const name = req.params.name;

  Building.findOne({
    where: {
      name: name,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ name: "not found" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Building with name=" + name,
      });
    });
};

// Update a Building by the name in the request
exports.update = (req, res) => {
  const buildingId = req.params.buildingId;

  Building.update(req.body, {
    where: { buildingId: buildingId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Building was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update building with buildingId=${buildingId}. Maybe Building was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Building with buildingId=" + buildingId,
      });
    });
};

// Delete a Building with the specified buildingId in the request
exports.delete = (req, res) => {
  const buildingId = req.params.buildingId;

  Building.destroy({
    where: { buildingId: buildingId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Building was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete  with buildingId=${buildingId}. Maybe Building was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Building with buildingId=" + buildingId,
      });
    });
};

// Delete all Buildings from the database.
exports.deleteAll = (req, res) => {
  Building.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Buildings were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all buildings.",
      });
    });
};
