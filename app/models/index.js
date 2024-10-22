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
const cascade = 'CASCADE';

db.assetCategory = require("./assetCategory.model.js")(sequelize, Sequelize);
db.userRole = require("./userRole.model.js")(sequelize, Sequelize);
db.userUserRole = require("./userUserRole.model.js")(sequelize, Sequelize);
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
db.userRole.hasMany(db.userUserRole, {
  foreignKey: "userRoleId",
  onDelete: "SET NULL",
});
db.userUserRole.belongsTo(db.userRole, {
  foreignKey: "userRoleId",
  onDelete: "SET NULL",
});

db.user.hasMany(db.userUserRole, {
  foreignKey: "userId",
  onDelete: "SET NULL",
})
db.userUserRole.belongsTo(db.user, {
  foreignKey: "userId",
  onDelete: "SET NULL"
})



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
db.serializedAsset.hasOne(db.log, { foreignKey: "serializedAssetId", onDelete: cascade });
db.log.belongsTo(db.serializedAsset, { foreignKey: "serializedAssetId", onDelete: cascade });

// Users and Sessions Link
db.user.hasMany(db.session, { foreignKey: "userId", onDelete: cascade });
db.session.belongsTo(db.user, { foreignKey: "userId", onDelete: cascade });

// AssetCategory and AssetType Link
db.assetCategory.hasMany(db.assetType, {
  foreignKey: "categoryId",
  onDelete: cascade,
});
db.assetType.belongsTo(db.assetCategory, {
  foreignKey: "categoryId",
  onDelete: cascade,
});

// AssetType and AssetProfile Link
db.assetType.hasMany(db.assetProfile, {
  foreignKey: "typeId",
  onDelete: cascade,
});
db.assetProfile.belongsTo(db.assetType, {
  foreignKey: "typeId",
  onDelete: cascade,
});

// AssetProfile and ProfileData Link
db.assetProfile.hasMany(db.profileData, {
  foreignKey: "profileId",
  onDelete: cascade,
});
db.profileData.belongsTo(db.assetProfile, {
  foreignKey: "profileId",
});

// Asset Profile and SerializedAsset Link
db.assetProfile.hasMany(db.serializedAsset, {
  foreignKey: "profileId",
  onDelete: cascade,
});
db.serializedAsset.belongsTo(db.assetProfile, {
  foreignKey: "profileId",
  onDelete: cascade,
});

// Lease and SerializedAsset Link
db.serializedAsset.hasOne(db.lease, {
  foreignKey: "serializedAssetId",
  onDelete: cascade,
});
db.lease.belongsTo(db.serializedAsset, {
  foreignKey: "serializedAssetId",
  onDelete: cascade,
});

// Warranty and SerializedAsset Link
db.serializedAsset.hasOne(db.warranty, {
  foreignKey: "serializedAssetId",
  onDelete: cascade,
});
db.warranty.belongsTo(db.serializedAsset, {
  foreignKey: "serializedAssetId",
  onDelete: cascade,
});

// Service and SerializedAsset Link
db.serializedAsset.hasOne(db.service, {
  foreignKey: "serializedAssetId",
  onDelete: cascade,
});
db.service.belongsTo(db.serializedAsset, {
  foreignKey: "serializedAssetId",
  onDelete: cascade,
});

// Person and PersonAsset Link
db.person.hasMany(db.personAsset, {
  foreignKey: "personId",
  onDelete: cascade,
});
db.personAsset.belongsTo(db.person, {
  foreignKey: "personId",
  onDelete: cascade,
});

// Person and Rooom Link
db.room.hasMany(db.person, {
  foreignKey: "roomId",
  onDelete: cascade,
});
db.person.belongsTo(db.room, {
  foreignKey: "roomId",
  onDelete: cascade,
});

// PersonAsset and SerializedAsset Link
db.serializedAsset.hasOne(db.personAsset, {
  foreignKey: "serializedAssetId",
  onDelete: cascade,
});
db.personAsset.belongsTo(db.serializedAsset, {
  foreignKey: "serializedAssetId",
  onDelete: cascade,
});

// SerializedAsset and Barcode Link
db.serializedAsset.hasMany(db.barcode, {
  foreignKey: "serializedAssetId",
  onDelete: cascade,
});
db.barcode.belongsTo(db.serializedAsset, {
  foreignKey: "serializedAssetId",
  onDelete: cascade,
});

// Building and Rooms Link
db.building.hasMany(db.room, { foreignKey: "buildingId", onDelete: cascade });
db.room.belongsTo(db.building, {
  foreignKey: "buildingId",
  onDelete: cascade,
});

// Buildings and BuildingAsset Link
db.building.hasMany(db.buildingAsset, {
  foreignKey: "buildingId",
  onDelete: cascade,
});
db.buildingAsset.belongsTo(db.building, {
  foreignKey: "buildingId",
  onDelete: cascade,
});

// Room and Room Asset Link
db.room.hasMany(db.roomAsset, { foreignKey: "roomId", onDelete: cascade });
db.roomAsset.belongsTo(db.room, { foreignKey: "roomId", onDelete: cascade });

// BuildingAsset and SerializedAsset Link
db.serializedAsset.hasOne(db.buildingAsset, {
  foreignKey: "serializedAssetId",
  onDelete: cascade,
});
db.buildingAsset.belongsTo(db.serializedAsset, {
  foreignKey: "serializedAssetId",
  onDelete: cascade,
});

// RoomAsset and SerializedAsset Link
db.serializedAsset.hasOne(db.roomAsset, {
  foreignKey: "serializedAssetId",
  onDelete: cascade,
});
db.roomAsset.belongsTo(db.serializedAsset, {
  foreignKey: "serializedAssetId",
  onDelete: cascade,
});

// AssetType and Report Link
db.assetType.hasMany(db.report, {
  foreignKey: "typeId",
  onDelete: cascade,
});
db.report.belongsTo(db.assetType, {
  foreignKey: "typeId",
  onDelete: cascade,
});

// AssetType and CustomFieldType Link
db.assetType.hasMany(db.customFieldType, {
  foreignKey: "typeId",
  onDelete: cascade,
  allowNull: false
});
db.customFieldType.belongsTo(db.assetType, {
  foreignKey: "typeId",
  onDelete: cascade,
  allowNull: false
});

// CustomField and CustomFieldType Link
db.customField.hasMany(db.customFieldType, {
  foreignKey: "customFieldId",
  onDelete: cascade,
  allowNull: false
});
db.customFieldType.belongsTo(db.customField, {
  foreignKey: "customFieldId",
  onDelete: cascade,
  allowNull: false
});

// CustomField and CustomFieldValue Link
db.customField.hasMany(db.customFieldValue, {
  foreignKey: 'customFieldId',
  onDelete: cascade,
});
db.customFieldValue.belongsTo(db.customField, {
  foreignKey: "customFieldId",
  onDelete: cascade,
});

// CustomField and ProfileData link
db.customFieldValue.hasMany(db.profileData, {
  foreignKey: 'fieldValueId',
  onDelete: cascade
});
db.profileData.belongsTo(db.customFieldValue, {
  foreignKey: 'fieldValueId',
  onDelete: cascade
});

module.exports = db;
