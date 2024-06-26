const db = require("../models");
const Room = db.room;

async function initializeRooms() {
  try {
    await Promise.all([
      Room.upsert({ roomId: 1, roomNo: 101, buildingId: 1 }),
      Room.upsert({ roomId: 2, roomNo: 102, buildingId: 1 }),
      Room.upsert({ roomId: 3, roomNo: 103, buildingId: 1 }),
      Room.upsert({ roomId: 4, roomNo: 201, buildingId: 2 }),
      Room.upsert({ roomId: 5, roomNo: 202, buildingId: 2 }),
      Room.upsert({ roomId: 6, roomNo: 203, buildingId: 2 }),
      Room.upsert({ roomId: 7, roomNo: 301, buildingId: 3 }),
      Room.upsert({ roomId: 8, roomNo: 302, buildingId: 3 }),
      Room.upsert({ roomId: 9, roomNo: 303, buildingId: 3 }),
      Room.upsert({ roomId: 10, roomNo: 401, buildingId: 4 }),
      Room.upsert({ roomId: 11, roomNo: 402, buildingId: 4 }),
      Room.upsert({ roomId: 12, roomNo: 403, buildingId: 4 }),
      Room.upsert({ roomId: 13, roomNo: 501, buildingId: 5 }),
      Room.upsert({ roomId: 14, roomNo: 502, buildingId: 5 }),
      Room.upsert({ roomId: 15, roomNo: 503, buildingId: 5 }),
      Room.upsert({ roomId: 16, roomNo: 601, buildingId: 6 }),
      Room.upsert({ roomId: 17, roomNo: 602, buildingId: 6 }),
      Room.upsert({ roomId: 18, roomNo: 603, buildingId: 6 }),
      Room.upsert({ roomId: 19, roomNo: 701, buildingId: 7 }),
      Room.upsert({ roomId: 20, roomNo: 702, buildingId: 7 }),
      Room.upsert({ roomId: 21, roomNo: 703, buildingId: 7 }),
      Room.upsert({ roomId: 22, roomNo: 801, buildingId: 8 }),
      Room.upsert({ roomId: 23, roomNo: 802, buildingId: 8 }),
      Room.upsert({ roomId: 24, roomNo: 803, buildingId: 8 }),
      Room.upsert({ roomId: 25, roomNo: 901, buildingId: 9 }),
      Room.upsert({ roomId: 26, roomNo: 902, buildingId: 9 }),
      Room.upsert({ roomId: 27, roomNo: 903, buildingId: 9 }),
      Room.upsert({ roomId: 28, roomNo: 101, buildingId: 10 }),
      Room.upsert({ roomId: 29, roomNo: 102, buildingId: 10 }),
      Room.upsert({ roomId: 30, roomNo: 103, buildingId: 10 }),
      Room.upsert({ roomId: 31, roomNo: 111, buildingId: 11 }),
      Room.upsert({ roomId: 32, roomNo: 112, buildingId: 11 }),
      Room.upsert({ roomId: 33, roomNo: 121, buildingId: 12 }),
      Room.upsert({ roomId: 34, roomNo: 122, buildingId: 12 }),
      Room.upsert({ roomId: 35, roomNo: 131, buildingId: 13 }),
      Room.upsert({ roomId: 36, roomNo: 132, buildingId: 13 }),
      Room.upsert({ roomId: 37, roomNo: 141, buildingId: 14 }),
      Room.upsert({ roomId: 38, roomNo: 142, buildingId: 14 }),
      Room.upsert({ roomId: 39, roomNo: 151, buildingId: 15 }),
      Room.upsert({ roomId: 40, roomNo: 152, buildingId: 15 }),
      Room.upsert({ roomId: 41, roomNo: 153, buildingId: 15 }),
      Room.upsert({ roomId: 42, roomNo: 161, buildingId: 16 }),
      Room.upsert({ roomId: 43, roomNo: 162, buildingId: 16 }),
      Room.upsert({ roomId: 44, roomNo: 171, buildingId: 17 }),
      Room.upsert({ roomId: 45, roomNo: 172, buildingId: 17 }),
      Room.upsert({ roomId: 46, roomNo: 181, buildingId: 18 }),
      Room.upsert({ roomId: 47, roomNo: 182, buildingId: 18 }),
      Room.upsert({ roomId: 48, roomNo: 191, buildingId: 19 }),
      Room.upsert({ roomId: 49, roomNo: 192, buildingId: 19 }),
      Room.upsert({ roomId: 50, roomNo: 193, buildingId: 19 }),
      Room.upsert({ roomId: 51, roomNo: 201, buildingId: 20 }),
      Room.upsert({ roomId: 52, roomNo: 202, buildingId: 20 }),
      Room.upsert({ roomId: 53, roomNo: 211, buildingId: 21 }),
      Room.upsert({ roomId: 54, roomNo: 212, buildingId: 21 }),
      Room.upsert({ roomId: 55, roomNo: 221, buildingId: 22 }),
      Room.upsert({ roomId: 56, roomNo: 222, buildingId: 22 }),
      Room.upsert({ roomId: 57, roomNo: 231, buildingId: 23 }),
      Room.upsert({ roomId: 58, roomNo: 232, buildingId: 23 }),
      Room.upsert({ roomId: 59, roomNo: 241, buildingId: 24 }),
      Room.upsert({ roomId: 60, roomNo: 242, buildingId: 24 }),
      Room.upsert({ roomId: 61, roomNo: 251, buildingId: 25 }),
      Room.upsert({ roomId: 62, roomNo: 252, buildingId: 25 }),
      Room.upsert({ roomId: 63, roomNo: 261, buildingId: 26 }),
      Room.upsert({ roomId: 64, roomNo: 262, buildingId: 26 }),
      Room.upsert({ roomId: 65, roomNo: 271, buildingId: 27 }),
      Room.upsert({ roomId: 66, roomNo: 272, buildingId: 27 }),
      Room.upsert({ roomId: 67, roomNo: 281, buildingId: 28 }),
      Room.upsert({ roomId: 68, roomNo: 282, buildingId: 28 }),
      Room.upsert({ roomId: 69, roomNo: 291, buildingId: 29 }),
      Room.upsert({ roomId: 70, roomNo: 292, buildingId: 29 }),
      Room.upsert({ roomId: 71, roomNo: 301, buildingId: 30 }),
      Room.upsert({ roomId: 72, roomNo: 302, buildingId: 30 }),
      Room.upsert({ roomId: 73, roomNo: 311, buildingId: 31 }),
      Room.upsert({ roomId: 74, roomNo: 312, buildingId: 31 }),
      Room.upsert({ roomId: 75, roomNo: 321, buildingId: 32 }),
      Room.upsert({ roomId: 76, roomNo: 322, buildingId: 32 }),
      Room.upsert({ roomId: 77, roomNo: 331, buildingId: 33 }),
      Room.upsert({ roomId: 78, roomNo: 332, buildingId: 33 }),
      Room.upsert({ roomId: 79, roomNo: 341, buildingId: 34 }),
      Room.upsert({ roomId: 80, roomNo: 342, buildingId: 34 }),
      Room.upsert({ roomId: 81, roomNo: 351, buildingId: 35 }),
      Room.upsert({ roomId: 82, roomNo: 352, buildingId: 35 }),
      Room.upsert({ roomId: 83, roomNo: 361, buildingId: 36 }),
      Room.upsert({ roomId: 84, roomNo: 362, buildingId: 36 }),
      Room.upsert({ roomId: 85, roomNo: 371, buildingId: 37 }),
      Room.upsert({ roomId: 86, roomNo: 372, buildingId: 37 }),
      Room.upsert({ roomId: 87, roomNo: 381, buildingId: 38 }),
      Room.upsert({ roomId: 88, roomNo: 382, buildingId: 38 }),
      Room.upsert({ roomId: 89, roomNo: 391, buildingId: 39 }),
      Room.upsert({ roomId: 90, roomNo: 392, buildingId: 39 }),
      Room.upsert({ roomId: 91, roomNo: 401, buildingId: 40 }),
      Room.upsert({ roomId: 92, roomNo: 402, buildingId: 40 }),
      Room.upsert({ roomId: 93, roomNo: 411, buildingId: 41 }),
      Room.upsert({ roomId: 94, roomNo: 412, buildingId: 41 }),
      Room.upsert({ roomId: 95, roomNo: 421, buildingId: 42 }),
      Room.upsert({ roomId: 96, roomNo: 422, buildingId: 42 }),
      Room.upsert({ roomId: 97, roomNo: 431, buildingId: 43 }),
      Room.upsert({ roomId: 98, roomNo: 432, buildingId: 43 }),
      Room.upsert({ roomId: 99, roomNo: 441, buildingId: 44 }),
      Room.upsert({ roomId: 100, roomNo: 442, buildingId: 44 }),
      Room.upsert({ roomId: 101, roomNo: 451, buildingId: 45 }),
      Room.upsert({ roomId: 102, roomNo: 452, buildingId: 45 }),
      Room.upsert({ roomId: 103, roomNo: 461, buildingId: 46 }),
      Room.upsert({ roomId: 104, roomNo: 462, buildingId: 46 }),
      Room.upsert({ roomId: 105, roomNo: 471, buildingId: 47 }),
      Room.upsert({ roomId: 106, roomNo: 472, buildingId: 47 }),
    ]);

    console.log("Rooms initialized successfully");
  } catch (error) {
    console.log("Initialization failed:", error);
  }
}

module.exports = { initializeRooms };
