const db = require("../models");
const RoomAsset = db.roomAsset;

async function initializeRoomAssets() {
  try {
    await Promise.all([
      // Assign a projector to a classroom in Science Hall
      RoomAsset.upsert({
        roomAssetId: 1,
        serializedAssetId: 63, // Assuming this is a projector
        roomId: 1, // Room 101 in Science Hall
        checkoutDate: "2024-03-19 09:00:00",
        expectedCheckinDate: null,
        checkinDate: null,
        checkoutStatus: 1,
        checkedOutBy: "Solomon Granger",
      }),
      // Assign a Wi-Fi router for enhanced internet access in a study room
      RoomAsset.upsert({
        roomAssetId: 2,
        serializedAssetId: 40, // Netgear Nighthawk R7000
        roomId: 10, // Room 401 in Mabee Learning Center
        checkoutDate: "2024-01-12 10:00:00",
        expectedCheckinDate: null,
        checkinDate: null,
        checkoutStatus: 1,
        checkedOutBy: "Zane Fike",
      }),
      // Assign a smart board to a conference room in Garvey Center
      RoomAsset.upsert({
        roomAssetId: 3,
        serializedAssetId: 60, // Assuming this is a smart board
        roomId: 7, // Room 301 in Garvey Center
        checkoutDate: "2024-01-20 11:00:00",
        expectedCheckinDate: null,
        checkinDate: null,
        checkoutStatus: 1,
        checkedOutBy: "Justin Davis",
      }),
      // Assign a video conferencing system to a meeting room in the University Services building
      RoomAsset.upsert({
        roomAssetId: 4,
        serializedAssetId: 26, // Poly Studio X50
        roomId: 22, // Room 801 in University Services
        checkoutDate: "2024-01-25 09:00:00",
        expectedCheckinDate: null,
        checkinDate: "2024-02-22 09:00:00",
        checkoutStatus: 0,
        checkedOutBy: "Jaxen McRay",
        checkedInBy: "Justin Davis",
      }),
     
    ]);

    console.log("RoomAssets initialized successfully");
  } catch (error) {
    console.log("Initialization failed:", error);
  }
}

module.exports = { initializeRoomAssets };