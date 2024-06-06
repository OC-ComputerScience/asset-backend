const db = require("../models");
const UserRole = db.userRole;
const AssetCategory = db.assetCategory;

// Create and Save a new UserRole
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a UserRole
  try {
    const userRole = await UserRole.create({
      name: req.body.name,
      categoryId: req.body.categoryId,
      canAdd: req.body.canAdd,
      canEdit: req.body.canEdit,
      canDelete: req.body.canDelete,
      canArchive: req.body.canArchive,
      canActivate: req.body.canActivate,
      viewCheckOutIn: req.body.viewCheckOutIn,
      viewServices: req.body.viewServices,
      viewMaintenance: req.body.viewMaintenance,
      viewWarranties: req.body.viewWarranties,
      viewLeases: req.body.viewLeases,
      viewReports: req.body.viewReports,
      viewManage: req.body.viewManage,
      viewAssets: req.body.viewAssets,
      viewFacilities: req.body.viewFacilities,
      viewPeople: req.body.viewPeople,
      viewUsers: req.body.viewUsers,
      isAdmin: req.body.isAdmin,
      isManager: req.body.isManager,
      isWorker: req.body.isWorker,
      isUnassigned: req.body.isUnassigned
    });
    res.send(userRole);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the UserRole.",
    });
  }
};


exports.findAll = async (req, res) => {
  try {
    const userRoles = await UserRole.findAll({
      include: [
        {
          model: AssetCategory,
          as: "assetCategory",
          attributes: ["categoryId", "categoryName", "desc"],
        },
      ],
    });
    res.send(userRoles);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving UserRoles.",
    });
  }
};


exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const userRole = await UserRole.findByPk(id, {
      include: [
        {
          model: AssetCategory,
          as: "assetCategory",
          attributes: ["categoryId", "categoryName", "desc"],
        },
      ],
    });
    if (userRole) {
      res.send(userRole);
    } else {
      res.status(404).send({
        message: `Cannot find UserRole with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving UserRole with id=" + id,
    });
  }
};

// Update a UserRole by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await UserRole.update(req.body, {
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "UserRole was updated successfully.",
      });
    } else {
      res.send({
        message: `Cannot update UserRole with id=${id}. Maybe UserRole was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating UserRole with id=" + id,
    });
  }
};



// Delete a UserRole with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const num = await UserRole.destroy({
      where: { id: id },
    });
    if (num == 1) {
      res.send({
        message: "UserRole was deleted successfully!",
      });
    } else {
      res.send({
        message: `Cannot delete UserRole with id=${id}. Maybe UserRole was not found!`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete UserRole with id=" + id,
    });
  }
};
