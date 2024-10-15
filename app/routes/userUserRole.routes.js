module.exports = (app) => {
    const userUserRoles = require("../controllers/userUserRole.controller.js");
    const { authenticate } = require("../authorization/authorization.js");
    const router = require("express").Router();
  
    // Create a new UserUserRole
    router.post("/", authenticate, userUserRoles.create);
  
    // Retrieve all UserUserRoles
    router.get("/", authenticate, userUserRoles.findAll);
  
    // Retrieve a single UserUserRole by id
    router.get("/:id", authenticate, userUserRoles.findOne);

    router.get("/user/:userId", authenticate, userUserRoles.findAllForUser);
  
    // Update a UserUserRole with id
    router.put("/:id", authenticate, userUserRoles.update);
  
    // Delete a UserUserRole with id
    router.delete("/:id", authenticate, userUserRoles.delete);
  
    // Delete all UserUserRoles
    router.delete("/", authenticate, userUserRoles.deleteAll);
  
    app.use("/asset-t1/useruserroles", router);
  };
  