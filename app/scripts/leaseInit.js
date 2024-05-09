const db = require("../models");
const lease = db.lease;

async function initializeLeases() {
    const leases = [
        {
          leaseId: 1,
          serializedAssetId: 69,
          lessor: "Daikin",
          startDate: "2023-05-14 00:00:00",
          length: 24,
          endDate: "2025-5-14 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 2,
          serializedAssetId: 69,
          lessor: "Daikin",
          startDate: "2019-05-14 00:00:00",
          length: 48,
          endDate: "2023-5-14 00:00:00",
          activeStatus: false
        },
        {
          leaseId: 3,
          serializedAssetId: 70,
          lessor: "Daikin",
          startDate: "2022-09-11 00:00:00",
          length: 48,
          endDate: "2026-09-11 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 4,
          serializedAssetId: 71,
          lessor: "Cisco",
          startDate: "2023-11-23 00:00:00",
          length: 12,
          endDate: "2024-11-23 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 5,
          serializedAssetId: 72,
          lessor: "Cisco",
          startDate: "2018-07-20 00:00:00",
          length: 48,
          endDate: "2022-07-20 00:00:00",
          activeStatus: false
        },
        {
          leaseId: 6,
          serializedAssetId: 72,
          lessor: "Cisco",
          startDate: "2022-07-20 00:00:00",
          length: 36,
          endDate: "2025-07-20 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 7,
          serializedAssetId: 75,
          lessor: "Daikin",
          startDate: "2022-01-01 00:00:00",
          length: 48,
          endDate: "2026-01-01 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 8,
          serializedAssetId: 76,
          lessor: "Daikin",
          startDate: "2022-09-26 00:00:00",
          length: 48,
          endDate: "2026-03-26 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 9,
          serializedAssetId: 77,
          lessor: "Daikin",
          startDate: "2022-03-11 00:00:00",
          length: 48,
          endDate: "2026-03-11 00:00:00",
          activeStatus: true
        },
        {
          leaseId:10,
          serializedAssetId: 78,
          lessor: "Daikin",
          startDate: "2022-01-13 00:00:00",
          length: 48,
          endDate: "2026-01-13 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 11,
          serializedAssetId: 79,
          lessor: "Daikin",
          startDate: "2022-05-23 00:00:00",
          length: 48,
          endDate: "2026-05-23 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 12,
          serializedAssetId: 80,
          lessor: "Daikin",
          startDate: "2022-04-11 00:00:00",
          length: 48,
          endDate: "2026-04-11 00:00:00",
          activeStatus: true
        },
        {
          leaseId:13,
          serializedAssetId: 81,
          lessor: "Daikin",
          startDate: "2023-10-23 00:00:00",
          length: 36,
          endDate: "2026-10-23 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 14,
          serializedAssetId: 82,
          lessor: "Daikin",
          startDate: "2022-11-11 00:00:00",
          length: 48,
          endDate: "2026-11-11 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 15,
          serializedAssetId: 83,
          lessor: "Daikin",
          startDate: "2022-12-03 00:00:00",
          length: 48,
          endDate: "2026-12-03 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 16,
          serializedAssetId: 84,
          lessor: "Daikin",
          startDate: "2022-04-30 00:00:00",
          length: 24,
          endDate: "2024-04-30 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 17,
          serializedAssetId: 85,
          lessor: "Daikin",
          startDate: "2018-07-15 00:00:00",
          length: 96,
          endDate: "2026-07-15 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 18,
          serializedAssetId: 86,
          lessor: "Daikin",
          startDate: "2024-03-09 00:00:00",
          length: 48,
          endDate: "2028-03-09 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 19,
          serializedAssetId: 87,
          lessor: "Daikin",
          startDate: "2023-09-11 00:00:00",
          length: 48,
          endDate: "2027-09-11 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 20,
          serializedAssetId: 88,
          lessor: "Daikin",
          startDate: "2022-08-22 00:00:00",
          length: 48,
          endDate: "2026-08-22 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 21,
          serializedAssetId: 89,
          lessor: "Daikin",
          startDate: "2020-07-10 00:00:00",
          length: 48,
          endDate: "2024-07-10 00:00:00",
          activeStatus: true
        },
        {
          leaseId: 22,
          serializedAssetId: 75,
          lessor: "Daikin",
          startDate: "2018-01-01 00:00:00",
          length: 48,
          endDate: "2022-01-01 00:00:00",
          activeStatus: false
        },
        {
          leaseId: 23,
          serializedAssetId: 76,
          lessor: "Daikin",
          startDate: "2018-09-26 00:00:00",
          length: 48,
          endDate: "2022-03-26 00:00:00",
          activeStatus: false
        },
        {
          leaseId: 24,
          serializedAssetId: 77,
          lessor: "Daikin",
          startDate: "2018-03-11 00:00:00",
          length: 48,
          endDate: "2022-03-11 00:00:00",
          activeStatus: false
        },
        {
          leaseId:25,
          serializedAssetId: 78,
          lessor: "Daikin",
          startDate: "2018-01-13 00:00:00",
          length: 48,
          endDate: "2022-01-13 00:00:00",
          activeStatus: false
        },
        {
          leaseId: 26,
          serializedAssetId: 79,
          lessor: "Daikin",
          startDate: "2018-05-23 00:00:00",
          length: 48,
          endDate: "2022-05-23 00:00:00",
          activeStatus: false
        },
        {
          leaseId: 27,
          serializedAssetId: 80,
          lessor: "Daikin",
          startDate: "2018-04-11 00:00:00",
          length: 48,
          endDate: "2022-04-11 00:00:00",
          activeStatus: false
        },
        {
          leaseId:28,
          serializedAssetId: 81,
          lessor: "Daikin",
          startDate: "2020-10-23 00:00:00",
          length: 36,
          endDate: "2023-10-23 00:00:00",
          activeStatus: false
        },
        {
          leaseId: 29,
          serializedAssetId: 82,
          lessor: "Daikin",
          startDate: "2018-11-11 00:00:00",
          length: 48,
          endDate: "2022-11-11 00:00:00",
          activeStatus: false
        },
        {
          leaseId: 30,
          serializedAssetId: 83,
          lessor: "Daikin",
          startDate: "2018-12-03 00:00:00",
          length: 48,
          endDate: "2022-12-03 00:00:00",
          activeStatus: false
        },
        {
          leaseId: 31,
          serializedAssetId: 84,
          lessor: "Daikin",
          startDate: "2020-04-30 00:00:00",
          length: 24,
          endDate: "2022-04-30 00:00:00",
          activeStatus: false
        },
        {
          leaseId: 32,
          serializedAssetId: 85,
          lessor: "Daikin",
          startDate: "2010-07-15 00:00:00",
          length: 96,
          endDate: "2018-07-15 00:00:00",
          activeStatus: false
        },
        {
          leaseId: 33,
          serializedAssetId: 86,
          lessor: "Daikin",
          startDate: "2020-03-09 00:00:00",
          length: 48,
          endDate: "2024-03-09 00:00:00",
          activeStatus: false
        },
        {
          leaseId: 34,
          serializedAssetId: 87,
          lessor: "Daikin",
          startDate: "2019-09-11 00:00:00",
          length: 48,
          endDate: "2023-09-11 00:00:00",
          activeStatus: false
        },
        {
          leaseId: 35,
          serializedAssetId: 88,
          lessor: "Daikin",
          startDate: "2018-08-22 00:00:00",
          length: 48,
          endDate: "2022-08-22 00:00:00",
          activeStatus: false
        },
        {
          leaseId: 36,
          serializedAssetId: 89,
          lessor: "Daikin",
          startDate: "2016-07-10 00:00:00",
          length: 48,
          endDate: "2020-07-10 00:00:00",
          activeStatus: false
        },
        ];        

        try {
          await Promise.all(leases.map((leaseInst) => lease.upsert({ ...leaseInst })));
          console.log("Leases initialized successfully for all serialized assets'.");
        } catch (error) {
          console.log("Initialization failed:", error);
        }
      }
      
      module.exports = { initializeLeases };
      