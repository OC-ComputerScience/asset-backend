const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.assetCategory = require("./assetCategory.model.js")(sequelize, Sequelize);
db.userRole = require("./userRole.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.assetType = require("./assetType.model.js")(sequelize, Sequelize);
db.assetProfile = require("./assetProfile.model.js")(sequelize, Sequelize);
db.profileData = require("./profileData.model.js")(sequelize, Sequelize);
db.serializedAsset = require("./serializedAsset.model.js")(sequelize, Sequelize);
db.lease = require("./lease.model.js")(sequelize, Sequelize);
db.warranty = require("./warranty.model.js")(sequelize, Sequelize);
db.service = require("./service.model.js")(sequelize, Sequelize);
db.person = require("./person.model.js")(sequelize, Sequelize);
db.personAsset = require("./personAsset.model.js")(sequelize, Sequelize);
db.log = require("./log.model.js")(sequelize, Sequelize);
db.barcode = require("./barcode.model.js")(sequelize, Sequelize);
db.building = require("./building.model.js")(sequelize, Sequelize);
db.room = require("./room.model.js")(sequelize, Sequelize);
db.buildingAsset = require("./buildingAsset.model.js")(sequelize, Sequelize);
db.roomAsset = require("./roomAsset.model.js")(sequelize, Sequelize);
db.report = require("./report.model.js")(sequelize, Sequelize);
db.customField = require("./customField.model.js")(sequelize, Sequelize);
db.customFieldType = require("./customFieldType.model.js")(sequelize, Sequelize);
db.customFieldValue = require("./customFieldValue.model.js")(sequelize, Sequelize);
// User and UserRole
db.userRole.hasMany(db.user, {
  foreignKey: "userRoleId",
  onDelete: "SET NULL",
});
db.user.belongsTo(db.userRole, {
  foreignKey: "userRoleId",
  onDelete: "SET NULL",
});

// AssetCategory and UserRole
db.assetCategory.hasOne(db.userRole, {
  foreignKey: "categoryId",
  onDelete: "SET NULL",
});
db.userRole.belongsTo(db.assetCategory, {
  foreignKey: "categoryId",
  onDelete: "SET NULL",
});

// Serialized asset and log
db.serializedAsset.hasOne(db.log, { foreignKey: "serializedAssetId", onDelete: "CASCADE" });
db.log.belongsTo(db.serializedAsset, { foreignKey: "serializedAssetId", onDelete: "CASCADE" });

// Users and Sessions Link
db.user.hasMany(db.session, { foreignKey: "userId", onDelete: "CASCADE" });
db.session.belongsTo(db.user, { foreignKey: "userId", onDelete: "CASCADE" });

// AssetCategory and AssetType Link
db.assetCategory.hasMany(db.assetType, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
});
db.assetType.belongsTo(db.assetCategory, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
});

// AssetType and AssetProfile Link
db.assetType.hasMany(db.assetProfile, {
  foreignKey: "typeId",
  onDelete: "CASCADE",
});
db.assetProfile.belongsTo(db.assetType, {
  foreignKey: "typeId",
  onDelete: "CASCADE",
});

// AssetProfile and ProfileData Link
db.assetProfile.hasMany(db.profileData, {
  foreignKey: "profileId",
  onDelete: "CASCADE",
});
db.profileData.belongsTo(db.assetProfile, {
  foreignKey: "profileId",
});

// Asset Profile and SerializedAsset Link
db.assetProfile.hasMany(db.serializedAsset, {
  foreignKey: "profileId",
  onDelete: "CASCADE",
});
db.serializedAsset.belongsTo(db.assetProfile, {
  foreignKey: "profileId",
  onDelete: "CASCADE",
});

// Lease and SerializedAsset Link
db.serializedAsset.hasOne(db.lease, {
  foreignKey: "serializedAssetId",
  onDelete: "CASCADE",
});
db.lease.belongsTo(db.serializedAsset, {
  foreignKey: "serializedAssetId",
  onDelete: "CASCADE",
});

// Warranty and SerializedAsset Link
db.serializedAsset.hasOne(db.warranty, {
  foreignKey: "serializedAssetId",
  onDelete: "CASCADE",
});
db.warranty.belongsTo(db.serializedAsset, {
  foreignKey: "serializedAssetId",
  onDelete: "CASCADE",
});

// Service and SerializedAsset Link
db.serializedAsset.hasOne(db.service, {
  foreignKey: "serializedAssetId",
  onDelete: "CASCADE",
});
db.service.belongsTo(db.serializedAsset, {
  foreignKey: "serializedAssetId",
  onDelete: "CASCADE",
});

// Person and PersonAsset Link
db.person.hasMany(db.personAsset, {
  foreignKey: "personId",
  onDelete: "CASCADE",
});
db.personAsset.belongsTo(db.person, {
  foreignKey: "personId",
  onDelete: "CASCADE",
});

// PersonAsset and SerializedAsset Link
db.serializedAsset.hasOne(db.personAsset, {
  foreignKey: "serializedAssetId",
  onDelete: "CASCADE",
});
db.personAsset.belongsTo(db.serializedAsset, {
  foreignKey: "serializedAssetId",
  onDelete: "CASCADE",
});

// SerializedAsset and Barcode Link
db.serializedAsset.hasMany(db.barcode, {
  foreignKey: "serializedAssetId",
  onDelete: "CASCADE",
});
db.barcode.belongsTo(db.serializedAsset, {
  foreignKey: "serializedAssetId",
  onDelete: "CASCADE",
});

// Building and Rooms Link
db.building.hasMany(db.room, { foreignKey: "buildingId", onDelete: "CASCADE" });
db.room.belongsTo(db.building, {
  foreignKey: "buildingId",
  onDelete: "CASCADE",
});

// Buildings and BuildingAsset Link
db.building.hasMany(db.buildingAsset, {
  foreignKey: "buildingId",
  onDelete: "CASCADE",
});
db.buildingAsset.belongsTo(db.building, {
  foreignKey: "buildingId",
  onDelete: "CASCADE",
});

// Room and Room Asset Link
db.room.hasMany(db.roomAsset, { foreignKey: "roomId", onDelete: "CASCADE" });
db.roomAsset.belongsTo(db.room, { foreignKey: "roomId", onDelete: "CASCADE" });

// BuildingAsset and SerializedAsset Link
db.serializedAsset.hasOne(db.buildingAsset, {
  foreignKey: "serializedAssetId",
  onDelete: "CASCADE",
});
db.buildingAsset.belongsTo(db.serializedAsset, {
  foreignKey: "serializedAssetId",
  onDelete: "CASCADE",
});

// RoomAsset and SerializedAsset Link
db.serializedAsset.hasOne(db.roomAsset, {
  foreignKey: "serializedAssetId",
  onDelete: "CASCADE",
});
db.roomAsset.belongsTo(db.serializedAsset, {
  foreignKey: "serializedAssetId",
  onDelete: "CASCADE",
});

// AssetType and Report Link
db.assetType.hasMany(db.report, {
  foreignKey: "typeId",
  onDelete: "CASCADE",
});
db.report.belongsTo(db.assetType, {
  foreignKey: "typeId",
  onDelete: "CASCADE",
});

// AssetType and CustomFieldType Link
db.assetType.hasMany(db.customFieldType, {
  foreignKey: "typeId",
  onDelete: "CASCADE",
});
db.customFieldType.belongsTo(db.assetType, {
  foreignKey: "typeId",
  onDelete: "CASCADE",
});

// CustomField and CustomFieldType Link
db.customField.hasMany(db.customFieldType, {
  foreignKey: "customFieldId",
  onDelete: "CASCADE",
});
db.customFieldType.belongsTo(db.customField, {
  foreignKey: "customFieldId",
  onDelete: "CASCADE",
});

// CustomField and CustomFieldValue Link
db.customField.hasMany(db.customFieldValue, {
  foreignKey: 'customFieldId',
  onDelete: "CASCADE",
});
db.customFieldValue.belongsTo(db.customField, {
  foreignKey: "customFieldId",
  onDelete: "CASCADE",
});

module.exports = db;
