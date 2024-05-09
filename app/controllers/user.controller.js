const db = require("../models");
const User = db.user;
const UserRole = db.userRole;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.fName) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Create a User
  const user = {
    id: req.body.id,
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    userRoleId: req.body.userRoleId,
    devPermission: req.body.devPermission,
    canAdd: req.body.canAdd,
    canEdit: req.body.canEdit,
    canArchive: req.body.canArchive,
    canActivate: req.body.canActivate,
    canDelete: req.body.canDelete,
    canManageMaintenance: req.body.canManageMaintenance,
    canManageWarranties: req.body.canManageWarranties,
    canManageLeases: req.body.canManageLeases,
    // refresh_token: req.body.refresh_token,
    // expiration_date: req.body.expiration_date
  };
  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Users from the database, including their associated UserRoles.
exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  User.findAll({
    where: condition,
    include: [
      {
        model: UserRole,
        as: "userRole",
        attributes: ["name"],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

// Find a single User with an email
exports.findByEmail = (req, res) => {
  const email = req.params.email;

  User.findOne({
    where: {
      email: email,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.send({ email: "not found" });
        /*res.status(404).send({
          message: `Cannot find User with email=${email}.`
        });*/
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with email=" + email,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.updateRole = async (req, res) => {
  const id = req.params.id;
  const userRoleId = req.body.userRoleId;

  console.log(
    `Server: Received updateRole request for user ${id} with role ${userRoleId}`,
    req.body
  );

  console.log(`Updating user ${id} to role ${userRoleId}`);

  try {
    const num = await User.update(
      { userRoleId: userRoleId },
      {
        where: { id: id },
      }
    );
    if (num == 1) {
      // If the user's role was updated successfully, update their permissions
      const userRole = await UserRole.findByPk(userRoleId);
      if (userRole) {
        await User.update(
          {
            canAdd: userRole.defaultCanAdd,
            canEdit: userRole.defaultCanEdit,
            canDelete: userRole.defaultCanDelete,
            canArchive: userRole.defaultCanArchive,
            canActivate: userRole.defaultCanActivate,
            canManageMaintenance: userRole.defaultCanManageMaintenance,
            canManageWarranties: userRole.defaultCanManageWarranties,
            canManageLeases: userRole.defaultCanManageLeases,
          },
          { where: { id: id } }
        );
      }
      res.send({ message: "User's role and permissions were updated successfully." });
    } else {
      res.send({
        message: `Cannot update User's role with id=${id}. Maybe User was not found or req.body is empty!`,
      });
    }
  } catch (err) {
    console.error("Error updating User's role:", err);
    res
      .status(500)
      .send({ message: "Error updating User's role with id=" + id });
  }
};


// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all People from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} People were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all people.",
      });
    });
};
