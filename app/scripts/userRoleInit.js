const db = require("../models");
const userRole = db.userRole;

async function initializeUserRole() {
  try {
    await Promise.all([
      await userRole.upsert({
        name: "Admin",
        categoryId: 4,
        defaultCanAdd: true,
        defaultCanEdit: true,
        defaultCanArchive: true,
        defaultCanActivate: true,
        defaultCanDelete: true,
        defaultCanManageMaintenance: true,
        defaultCanManageWarranties: true,
        defaultCanManageLeases: true,
      }),
      await userRole.upsert({
        name: "Unassigned",
        categoryId: null,
        defaultCanAdd: false,
        defaultCanEdit: false,
        defaultCanArchive: false,
        defaultCanActivate: false,
        defaultCanDelete: false,
        defaultCanManageMaintenance: false,
        defaultCanManageWarranties: false,
        defaultCanManageLeases: false,
      }),
      await userRole.upsert({
        name: "Maintenance Manager",
        categoryId: 3,
        defaultCanAdd: true,
        defaultCanEdit: true,
        defaultCanArchive: true,
        defaultCanActivate: true,
        defaultCanDelete: false,
        defaultCanManageMaintenance: true,
        defaultCanManageWarranties: true,
        defaultCanManageLeases: true,
      }),
      await userRole.upsert({
        name: "Maintenance Worker",
        categoryId: 3,
        defaultCanAdd: false,
        defaultCanEdit: false,
        defaultCanArchive: false,
        defaultCanActivate: false,
        defaultCanDelete: false,
        defaultCanManageMaintenance: true,
        defaultCanManageWarranties: false,
        defaultCanManageLeases: false,
      }),
      await userRole.upsert({
        name: "IT Manager",
        categoryId: 1,
        defaultCanAdd: true,
        defaultCanEdit: true,
        defaultCanArchive: true,
        defaultCanActivate: true,
        defaultCanDelete: false,
        defaultCanManageMaintenance: true,
        defaultCanManageWarranties: true,
        defaultCanManageLeases: true,
      }),
      await userRole.upsert({
        name: "IT Worker",
        categoryId: 1,
        defaultCanAdd: false,
        defaultCanEdit: false,
        defaultCanArchive: false,
        defaultCanActivate: false,
        defaultCanDelete: false,
        defaultCanManageMaintenance: true,
        defaultCanManageWarranties: false,
        defaultCanManageLeases: false,
      }),
      await userRole.upsert({
        name: "Support Central Manager",
        categoryId: 2,
        defaultCanAdd: true,
        defaultCanEdit: true,
        defaultCanArchive: true,
        defaultCanActivate: true,
        defaultCanDelete: false,
        defaultCanManageMaintenance: true,
        defaultCanManageWarranties: true,
        defaultCanManageLeases: true,
      }),
      await userRole.upsert({
        name: "Support Central Worker",
        categoryId: 2,
        defaultCanAdd: false,
        defaultCanEdit: false,
        defaultCanArchive: false,
        defaultCanActivate: false,
        defaultCanDelete: false,
        defaultCanManageMaintenance: true,
        defaultCanManageWarranties: false,
        defaultCanManageLeases: false,
      }),
    ]);

    console.log("User Role initialized successfully");
  } catch (error) {
    console.log("Initialization failed:", error);
  }
}

module.exports = { initializeUserRole };
