const db = require("../models");
const UserUserRole = db.userUserRole;
const User = db.user;
const UserRole = db.userRole;

// Create and Save a new UserUserRole
exports.create = async (req, res) => {
  try {
    const { userId, userRoleId, active } = req.body;

    if (!userId || !userRoleId || active === undefined) {
      return res.status(400).send({
        message: "User ID, User Role ID, and active status cannot be empty",
      });
    }

    const userUserRole = {
      userId,
      userRoleId,
      active,
    };

    const data = await UserUserRole.create(userUserRole);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the UserUserRole.",
    });
  }
};

// Retrieve all UserUserRoles
exports.findAll = async (req, res) => {
  try {
    const roles = await UserUserRole.findAll({
      include: [{model: User}, {model: UserRole}],
    });
    res.send(roles);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving UserUserRoles.",
    });
  }
};

// Retrieve a single UserUserRole by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const role = await UserUserRole.findByPk(id, {
      include: [{model: User}, {model: UserRole}],
    });

    if (role) {
      res.send(role);
    } else {
      res.status(404).send({
        message: `Cannot find UserUserRole with id=${id}.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving UserUserRole with id=" + id,
    });
  }
};

exports.findAllForUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const role = await UserUserRole.findAll({
        where: {userId: userId},
        include: [{model: User}, {model: UserRole}],
      });
  
      if (role) {
        res.send(role);
      } else {
        res.status(404).send({
          message: `Cannot find UserUserRole with id=${id}.`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error retrieving UserUserRole with id=" + id,
      });
    }
  };

// Update a UserUserRole by the id in the request
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await UserUserRole.update(req.body, { where: { id } });

    if (updated) {
      res.send({ message: "UserUserRole was updated successfully." });
    } else {
      res.status(404).send({
        message: `Cannot update UserUserRole with id=${id}. Maybe UserUserRole was not found.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Error updating UserUserRole with id=" + id,
    });
  }
};

// Delete a UserUserRole with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await UserUserRole.destroy({ where: { id } });

    if (deleted) {
      res.send({ message: "UserUserRole was deleted successfully!" });
    } else {
      res.status(404).send({
        message: `Cannot delete UserUserRole with id=${id}. UserUserRole not found.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Could not delete UserUserRole with id=" + id,
    });
  }
};

// Delete all UserUserRoles
exports.deleteAll = async (req, res) => {
  try {
    const deleted = await UserUserRole.destroy({ where: {}, truncate: false });

    res.send({ message: `${deleted} UserUserRoles were deleted successfully!` });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all UserUserRoles.",
    });
  }
};
