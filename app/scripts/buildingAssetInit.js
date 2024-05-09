const db = require("../models");
const BuildingAsset = db.buildingAsset;

async function initializeBuildingAssets() {
  try {
    await Promise.all([
      // Assign video conferencing bar to Garvey Center (GC) for virtual meetings
      BuildingAsset.upsert({
        buildingAssetId: 1,
        serializedAssetId: 25, // Poly Studio X50
        buildingId: 3, // Garvey Center
        checkoutDate: "2024-01-10 09:00:00",
        expectedCheckinDate: null,
        checkinDate: null,
        checkoutStatus: 1,
        checkedOutBy: "Jaxen McRay",
      }),
      // Assign a high-performance router to Mabee Learning Center for enhanced internet access
      BuildingAsset.upsert({
        buildingAssetId: 2,
        serializedAssetId: 41, // Netgear Nighthawk R7000
        buildingId: 4, // Mabee Learning Center
        checkoutDate: "2024-01-15 10:00:00",
        expectedCheckinDate: null,
        checkinDate: null,
        checkoutStatus: 1,
        checkedOutBy: "Zane Fike",
      }),
      // Assign a managed switch to the College of Engineering & Computer Science for network management
      BuildingAsset.upsert({
        buildingAssetId: 3,
        serializedAssetId: 43, // Ubiquiti UniFi Switch
        buildingId: 19, // CECS
        checkoutDate: "2024-01-20 11:00:00",
        expectedCheckinDate: null,
        checkinDate: null,
        checkoutStatus: 1,
        checkedOutBy: "Justin Davis",
      }),
      // Assign a professional camera to the Marketing department in the University Services building for content creation
      BuildingAsset.upsert({
        buildingAssetId: 4,
        serializedAssetId: 20, // Canon EOS R5
        buildingId: 22, // University Services
        checkoutDate: "2024-01-25 09:00:00",
        expectedCheckinDate: null,
        checkinDate: "2024-03-15 09:00:00",
        checkoutStatus: 0,
        checkedOutBy: "Solomon Granger",
        checkedInBy: "Jaxen McRay",
      }),
        BuildingAsset.upsert({
          buildingAssetId: 5,
          serializedAssetId: 75, // Daikin AC
          buildingId: 1, // University Services
          checkoutDate: "2022-09-25 11:00:00",
          expectedCheckinDate: null,
          checkinDate: null,
          checkoutStatus: 1,
          checkedOutBy: "Zane Fike",
          checkedInBy: null,
        }),
        BuildingAsset.upsert({
          buildingAssetId: 6,
          serializedAssetId: 76, // Daikin AC
          buildingId: 2, // University Services
          checkoutDate: "2023-04-12 10:30:00",
          expectedCheckinDate: null,
          checkinDate: null,
          checkoutStatus: 1,
          checkedOutBy: "Jaxen McRay",
          checkedInBy: null,
                }),
        BuildingAsset.upsert({
          buildingAssetId: 7,
          serializedAssetId: 77, // Daikin AC
          buildingId: 3, // University Services
          checkoutDate: "2022-11-10 11:31:00",
          expectedCheckinDate: null,
          checkinDate: null,
          checkoutStatus: 1,
          checkedOutBy: "Solomon Granger",
          checkedInBy: null,
                }),
        BuildingAsset.upsert({
          buildingAssetId: 8,
          serializedAssetId: 78, // Daikin AC
          buildingId: 4, // University Services
          checkoutDate: "2022-02-20 03:15:00",
          expectedCheckinDate: null,
          checkinDate: null,
          checkoutStatus: 1,
          checkedOutBy: "Justin Davis",
          checkedInBy: null,
                }),
        BuildingAsset.upsert({
          buildingAssetId: 9,
          serializedAssetId: 79, // Daikin AC
          buildingId: 5, // University Services
          checkoutDate: "2024-01-01 08:20:00",
          expectedCheckinDate: null,
          checkinDate: null,
          checkoutStatus: 1,
          checkedOutBy: "Garret Thompson",
          checkedInBy: null,
                }),
        BuildingAsset.upsert({
          buildingAssetId: 10,
          serializedAssetId: 80, // Daikin AC
          buildingId: 6, // University Services
          checkoutDate: "2024-02-14 07:30:00",
          expectedCheckinDate: null,
          checkinDate: null,
          checkoutStatus: 1,
          checkedOutBy: "Solomon Granger",
          checkedInBy: null,
                }),
        BuildingAsset.upsert({
          buildingAssetId: 11,
          serializedAssetId: 81,// Daikin AC
          buildingId: 7, // University Services
          checkoutDate: "2023-12-14 09:00:00",
          expectedCheckinDate: null,
          checkinDate: null,
          checkoutStatus: 1,
          checkedOutBy: "Jaxen McRay",
          checkedInBy: null,  
              }),
        BuildingAsset.upsert({
          buildingAssetId: 12,
          serializedAssetId: 82, // Daikin AC
          buildingId: 8, // University Services
          checkoutDate: "2023-08-22 10:00:00",
          expectedCheckinDate: null,
          checkinDate: null,
          checkoutStatus: 1,
          checkedOutBy: "Solomon Granger",
          checkedInBy: null,
                }),
        BuildingAsset.upsert({
          buildingAssetId: 13,
          serializedAssetId: 83, // Daikin AC
          buildingId: 9, // University Services
          checkoutDate: "2023-10-22 03:00:00",
          expectedCheckinDate: null,
          checkinDate: null,
          checkoutStatus: 1,
          checkedOutBy: "Zane Fike",
          checkedInBy: null,
                }),
        BuildingAsset.upsert({
          buildingAssetId: 14,
          serializedAssetId: 84,// Daikin AC
          buildingId: 10, // University Services
          checkoutDate: "2023-08-12 14:00:00",
          expectedCheckinDate: null,
          checkinDate: null,
          checkoutStatus: 1,
          checkedOutBy: "Solomon Granger",
          checkedInBy: null,
                }),
        BuildingAsset.upsert({
          buildingAssetId: 15,
          serializedAssetId: 85, // Daikin AC
          buildingId: 11, // University Services
          checkoutDate: "2024-01-12 15:00:00",
          expectedCheckinDate: null,
          checkinDate: null,
          checkoutStatus: 1,
          checkedOutBy: "Justin Davis",
          checkedInBy: null,
        }),
        BuildingAsset.upsert({
          buildingAssetId: 16,
          serializedAssetId: 86, // Daikin AC
          buildingId: 12, // University Services
          checkoutDate: "2024-01-25 09:00:00",
          expectedCheckinDate: null,
          checkinDate: null,
          checkoutStatus: 1,
          checkedOutBy: "Solomon Granger",
          checkedInBy: null,
                }),
        BuildingAsset.upsert({
          buildingAssetId: 18,
          serializedAssetId: 89, // Daikin AC
          buildingId: 14, // University Services
          checkoutDate: "2023-01-12 09:00:00",
          expectedCheckinDate: null,
          checkinDate: null,
          checkoutStatus: 1,
          checkedOutBy: "Jaxen McRay",
          checkedInBy: null,
                }),
    ]);

    console.log("BuildingAssets initialized successfully");
  } catch (error) {
    console.log("Initialization failed:", error);
  }
}

module.exports = { initializeBuildingAssets };
