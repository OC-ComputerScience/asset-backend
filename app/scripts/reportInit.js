const db = require("../models");
const Report = db.report;

async function initializeReports() {
  const reports = [
    {
      // Report 1: All Acquired Assets in the Last Quarter
      reportId: 1,
      typeId: null,
      startDate: "2024-01-01 00:00:00",
      endDate: "2024-03-31 00:00:00",
      reportDate: "2024-04-06 00:00:00",
      dateFilter: "Acquisition Date",
      reportType: "type",
    },
    {
      // Report 2: All Disposed Assets
      reportId: 2,
      typeId: null,
      startDate: null,
      endDate: null,
      reportDate: "2024-04-07 00:00:00",
      dateFilter: "Disposal Date",
      reportType: "type",
    },
    {
      // Report 3: Newly Acquired Smartphones
      reportId: 3,
      typeId: 1, // Referencing typeId for Smartphones
      startDate: "2024-02-01 00:00:00",
      endDate: "2024-03-31 00:00:00",
      reportDate: "2024-04-08 00:00:00",
      dateFilter: "Acquisition Date",
      reportType: "type",
    },
    {
      // Report 4: Laptops Disposed in the Last Six Months
      reportId: 4,
      typeId: 2, // Referencing typeId for Laptops
      startDate: "2023-10-01 00:00:00",
      endDate: "2024-03-31 00:00:00",
      reportDate: "2024-04-09 00:00:00",
      dateFilter: "Disposal Date",
      reportType: "type",
    },
    {
      // Report 5: Acquisition of High-Value Assets ($1500+) This Year
      reportId: 5,
      typeId: null, // Applies to all types
      startDate: "2024-01-01 00:00:00",
      endDate: "2024-12-31 00:00:00",
      reportDate: "2024-04-10 00:00:00",
      dateFilter: "Acquisition Date",
      reportType: "type",
    },
    // Report 6: All Assets Checked Out Last Month
    {
      reportId: 6,
      typeId: null,
      startDate: "2024-03-01 00:00:00",
      endDate: "2024-03-31 00:00:00",
      reportDate: "2024-04-07 00:00:00",
      dateFilter: "Checkout Date",
      reportType: "assignment",
    },

    // Report 7: All Assets Checked In Last Month
    {
      reportId: 7,
      typeId: null,
      startDate: "2024-03-01 00:00:00",
      endDate: "2024-03-31 00:00:00",
      reportDate: "2024-04-08 00:00:00",
      dateFilter: "Checkin Date",
      reportType: "assignment",
    },

    // Report 8: Managed Assets Last Quarter
    {
      reportId: 8,
      typeId: null,
      startDate: "2024-01-01 00:00:00",
      endDate: "2024-03-31 00:00:00",
      reportDate: "2024-04-09 00:00:00",
      dateFilter: "Both",
      reportType: "assignment",
    },

    // Report 9: High-Value Laptops Managed Last Year
    {
      reportId: 9,
      typeId: 2, // Assuming typeId 2 is for high-value Laptops
      startDate: "2024-01-01 00:00:00",
      endDate: "2024-12-31 00:00:00",
      reportDate: "2024-04-10 00:00:00",
      dateFilter: "Both",
      reportType: "assignment",
    },

    // Report 10: Smartphones Checked Out and Not Yet Checked In
    {
      reportId: 10,
      typeId: 1, // Assuming typeId 1 is for Smartphones
      startDate: "2023-01-01 00:00:00",
      endDate: "2024-04-01 00:00:00",
      reportDate: "2024-04-01 00:00:00",
      dateFilter: "Checkout Date",
      reportType: "assignment",
    },
    {
      // Report 11: Q4 Acquired Laptops
      reportId: 11,
      typeId: 2, // Applies to all types
      startDate: "2023-10-01 00:00:00",
      endDate: "2023-12-31 00:00:00",
      reportDate: "2024-04-22 00:00:00",
      dateFilter: "Acquisition Date",
      reportType: "type",
    },
    {
      reportId: 12,
      typeId: 1,
      startDate: "2024-01-01 00:00:00",
      endDate: "2024-12-31 00:00:00",
      reportDate: "2024-04-05 00:00:00",
      dateFilter: "Both",
      reportType: "assignment",
    },
    {
      reportId: 13,
      typeId: 3,
      startDate: "2024-01-01 00:00:00",
      endDate: "2024-12-31 00:00:00",
      reportDate: "2024-04-03 00:00:00",
      dateFilter: "Both",
      reportType: "assignment",
    },
    // Report 8: Managed Assets Last Month
    {
      reportId: 14,
      typeId: null,
      startDate: "2024-03-01 00:00:00",
      endDate: "2024-03-31 00:00:00",
      reportDate: "2024-04-022 00:00:00",
      dateFilter: "Both",
      reportType: "assignment",
    },
  ];

  try {
    await Promise.all(reports.map((report) => Report.upsert(report)));
    console.log("Reports initialized successfully.");
  } catch (error) {
    console.log("Initialization failed:", error);
  }
}

module.exports = { initializeReports };
