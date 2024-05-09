const db = require("../models");
const PersonAsset = db.personAsset;

async function initializePersonAssets() {
  try {
    await Promise.all([
      // Assigning unique assets to different users, within the specified date range
      PersonAsset.upsert({
        personAssetId: 1,
        serializedAssetId: 1, // iPhone 13
        personId: 5, // Assigned to Emily Wong
        checkoutDate: "2024-01-15 09:00:00",
        expectedCheckinDate: "2024-03-27 05:00:00",
        checkinDate: null,
        checkoutStatus: 1,
        checkedOutBy: "Jaxen McRay",
      }),
      PersonAsset.upsert({
        personAssetId: 2,
        serializedAssetId: 5, // Samsung Galaxy S21
        personId: 6, // Assigned to Garrett-Peter Thompson
        checkoutDate: "2024-02-10 10:30:00",
        expectedCheckinDate: null, // Checked out indefinitely
        checkinDate: null,
        checkoutStatus: 1,
        checkedOutBy: "Zane Fike",
      }),
      PersonAsset.upsert({
        personAssetId: 3,
        serializedAssetId: 9, // Dell XPS 15
        personId: 7, // Assigned to Arthur Morgan
        checkoutDate: "2024-02-20 11:45:00",
        expectedCheckinDate: "2024-03-15 05:00:00",
        checkinDate: "2024-03-16 16:30:00",
        checkoutStatus: 0,
        checkedOutBy: "Solomon Granger",
        checkedInBy: "Solomon Granger",
      }),
      PersonAsset.upsert({
        personAssetId: 4,
        serializedAssetId: 13, // MacBook Pro 16"
        personId: 2, // Assigned to Zane Fike
        checkoutDate: "2024-03-01 14:20:00",
        expectedCheckinDate: "2024-04-19 05:00:00",
        checkinDate: null,
        checkoutStatus: 1,
        checkedOutBy: "Justin Davis",
      }),
      PersonAsset.upsert({
        personAssetId: 5,
        serializedAssetId: 14, // iPad Pro
        personId: 9, // Assigned to Sophia Garcia
        checkoutDate: "2024-01-25 08:15:00",
        expectedCheckinDate: "2024-03-05 05:00:00",
        checkinDate: "2024-03-06 10:00:00",
        checkoutStatus: 0,
        checkedOutBy: "Jaxen McRay",
        checkedInBy: "Solomon Granger",
      }),
      PersonAsset.upsert({
        personAssetId: 6,
        serializedAssetId: 22, // Sony Alpha A7 III - Full-frame mirrorless camera
        personId: 10, // Assigned to Ethan Lee
        checkoutDate: "2024-02-05 09:30:00",
        expectedCheckinDate: "2024-03-05 05:00:00",
        checkinDate: "2024-03-04 15:00:00",
        checkoutStatus: 0,
        checkedOutBy: "Solomon Granger",
        checkedInBy: "Zane Fike",
      }),
      PersonAsset.upsert({
        personAssetId: 7,
        serializedAssetId: 29, // HP Spectre x360
        personId: 11, // Assigned to Alex Johnson
        checkoutDate: "2024-02-12 10:45:00",
        expectedCheckinDate: null, // Checked out indefinitely
        checkinDate: null,
        checkoutStatus: 1,
        checkedOutBy: "Justin Davis",
      }),
      PersonAsset.upsert({
        personAssetId: 8,
        serializedAssetId: 38, // Logitech C920 HD Pro - Webcam
        personId: 2, // Assigned to Zane Fike
        checkoutDate: "2024-03-10 11:00:00",
        expectedCheckinDate: "2024-04-21 05:00:00",
        checkinDate: null,
        checkoutStatus: 1,
        checkedOutBy: "Zane Fike",
      }),
      PersonAsset.upsert({
        personAssetId: 9,
        serializedAssetId: 30, // Microsoft Surface Pro 7
        personId: 13, // Assigned to Elijah Hernandez
        checkoutDate: "2024-01-20 12:15:00",
        expectedCheckinDate: "2024-03-20 05:00:00",
        checkinDate: "2024-03-30 14:00:00",
        checkoutStatus: 0,
        checkedOutBy: "Jaxen McRay",
        checkedInBy: "Jaxen McRay",
      }),
      PersonAsset.upsert({
        personAssetId: 10,
        serializedAssetId: 4, 
        personId: 4, // Assigned to Justin Davis
        checkoutDate: "2022-01-20 12:15:00",
        expectedCheckinDate: "2023-01-20 05:00:00",
        checkinDate: "2023-01-20 14:00:00",
        checkoutStatus: 0,
        checkedOutBy: "Jaxen McRay",
        checkedInBy: "Solomon Granger",
      }),
      PersonAsset.upsert({
        personAssetId:11,
        serializedAssetId: 4, 
        personId: 4, // Assigned to Justin Davis
        checkoutDate: "2023-05-20 12:15:00",
        expectedCheckinDate: "2024-05-20 05:00:00",
        checkinDate: null,
        checkoutStatus: 1,
        checkedOutBy: "Zane Fike",
        checkedInBy: "Jaxen McRay",
      }),
      PersonAsset.upsert({
        personAssetId: 12,
        serializedAssetId: 18, 
        personId: 4, // Assigned to Justin Davis
        checkoutDate: "2023-08-20 12:15:00",
        expectedCheckinDate: "2023-12-20 05:00:00",
        checkinDate: "2023-12-30 14:00:00",
        checkoutStatus: 0,
        checkedOutBy: "Solomon Granger",
        checkedInBy: "Zane Fike",
      }),
      PersonAsset.upsert({
        personAssetId: 13,
        serializedAssetId: 14, 
        personId: 4, // Assigned to Justin Davis
        checkoutDate: "2021-01-20 12:15:00",
        expectedCheckinDate: "2021-01-27 05:00:00",
        checkinDate: "2021-01-30 14:00:00",
        checkoutStatus: 0,
        checkedOutBy: "Zane Fike",
        checkedInBy: "Zane Fike",
      }),
      PersonAsset.upsert({
        personAssetId: 14,
        serializedAssetId: 39, 
        personId: 4, // Assigned to Justin Davis
        checkoutDate: "2024-02-20 12:15:00",
        expectedCheckinDate: null,
        checkinDate: null,
        checkoutStatus: 1,
        checkedOutBy: "Jaxen McRay",
        checkedInBy: "Solomon Granger",
      }),
      PersonAsset.upsert({
        personAssetId: 15,
        serializedAssetId: 90, //key
        personId: 1, 
        checkoutDate: "2024-01-17 09:00:00",
        expectedCheckinDate: null,
        checkinDate: null,
        checkoutStatus: 1,
        checkedOutBy: "Solomon Granger",
        checkedInBy: "Zane Fike",
      }),
      PersonAsset.upsert({
        personAssetId: 16,
        serializedAssetId: 91, //key
        personId: 2, 
        checkoutDate: "2024-01-28 09:00:00",
        expectedCheckinDate: null,
        checkinDate: null,
        checkoutStatus: 0,
        checkedOutBy: "Jaxen McRay",
        checkedInBy: "Zane Fike",
      }),
      PersonAsset.upsert({
        personAssetId: 17,
        serializedAssetId: 92, //key
        personId: 3, 
        checkoutDate: "2024-04-22 09:00:00",
        expectedCheckinDate: null,
        checkinDate: null,
        checkoutStatus: 0,
        checkedOutBy: "Solomon Granger",
        checkedInBy: "Zane Fike",
      }),
    ]);
    console.log("PersonAssets initialized successfully");
  } catch (error) {
    console.log("Initialization failed:", error);
  }
}

module.exports = { initializePersonAssets };
