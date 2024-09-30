require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const db = require("./app/models");
const scheduleCronJob = require('./app//services/cronMail');

var corsOptions = {
  origin: ["http://localhost:8081", "https://asset.eaglesoftwareteam.com", "https://assetdev.oc.edu"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable pre-flight for all routes

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

db.sequelize
  .sync({force: false})
  .then(async () => {
    console.log("Database synchronized successfully.");

  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
    process.exit(1);
  });

// API routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/userRole.routes")(app);
require("./app/routes/assetCategory.routes")(app);
require("./app/routes/assetType.routes")(app);
require("./app/routes/assetProfile.routes")(app);
require("./app/routes/profileData.routes")(app);
require("./app/routes/serializedAsset.routes")(app);
require("./app/routes/lease.routes")(app);
require("./app/routes/warranty.routes")(app);
require("./app/routes/service.routes")(app);
require("./app/routes/person.routes")(app);
require("./app/routes/personAsset.routes")(app);
require("./app/routes/log.routes")(app);
require("./app/routes/barcode.routes")(app);
require("./app/routes/building.routes")(app);
require("./app/routes/room.routes")(app);
require("./app/routes/buildingAsset.routes")(app);
require("./app/routes/roomAsset.routes")(app);
require("./app/routes/report.routes")(app);
require("./app/routes/email.routes")(app);
require("./app/routes/customField.routes.js")(app);
require("./app/routes/customFieldValue.routes.js")(app);
require("./app/routes/customFieldType.routes.js")(app);
require("./app/routes/assignment.routes.js")(app);

// Start email scheduling script
scheduleCronJob();

// Simple route
app.get("/", (_req, res) => {
  res.json({ message: "Welcome to Asset Tracking." });
});

// Set port, listen for requests
const PORT = process.env.PORT || 3031;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = { app, db };
