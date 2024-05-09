const db = require("../models");
const Building = db.building;

async function initializeBuildings() {
  try {
    await Promise.all([
      Building.upsert({
        buildingId: 1,
        name: "Fitness Center (The Dub)",
        abbreviation: "FC",
      }),
      Building.upsert({
        buildingId: 2,
        name: "Mabee Laboratories",
        abbreviation: "ML",
      }),
      Building.upsert({
        buildingId: 3,
        name: "Garvey Center",
        abbreviation: "GC",
      }),
      Building.upsert({
        buildingId: 4,
        name: "Mabee Learning Center",
        abbreviation: "MLC",
      }),
      Building.upsert({
        buildingId: 5,
        name: "Gaylord Dining Room",
        abbreviation: "GDR",
      }),
      Building.upsert({
        buildingId: 6,
        name: "Church Resources",
        abbreviation: "CR",
      }),
      Building.upsert({
        buildingId: 7,
        name: "Gaylord Hall",
        abbreviation: "GH",
      }),
      Building.upsert({
        buildingId: 8,
        name: "Cogswell-Alexander Hall",
        abbreviation: "CAH",
      }),
      Building.upsert({
        buildingId: 9,
        name: "Gaylord University Center",
        abbreviation: "GUC",
      }),
      Building.upsert({
        buildingId: 10,
        name: "Thelma Gaylord Forum",
        abbreviation: "TGF",
      }),
      Building.upsert({
        buildingId: 11,
        name: "College of Biblical Studies",
        abbreviation: "CBS",
      }),
      Building.upsert({
        buildingId: 12,
        name: "Gotcher Dining Room",
        abbreviation: "GDR",
      }),
      Building.upsert({
        buildingId: 13,
        name: "McIntosh Conservatory",
        abbreviation: "MC",
      }),
      Building.upsert({
        buildingId: 14,
        name: "Tonys Alley",
        abbreviation: "TA",
      }),
      Building.upsert({
        buildingId: 15,
        name: "College of Business Administration",
        abbreviation: "CBA",
      }),
      Building.upsert({
        buildingId: 16,
        name: "Graduate School of Business",
        abbreviation: "GSB",
      }),
      Building.upsert({
        buildingId: 17,
        name: "Mercy Clinic",
        abbreviation: "MC",
      }),
      Building.upsert({
        buildingId: 18,
        name: "University Dining",
        abbreviation: "UD",
      }),
      Building.upsert({
        buildingId: 19,
        name: "College of Engineering & Computer Science",
        abbreviation: "CECS",
      }),
      Building.upsert({
        buildingId: 20,
        name: "Graduate School of Engineering",
        abbreviation: "GSE",
      }),
      Building.upsert({
        buildingId: 21,
        name: "MidFirst Plaza",
        abbreviation: "MFP",
      }),
      Building.upsert({
        buildingId: 22,
        name: "University Services",
        abbreviation: "US",
      }),
      Building.upsert({
        buildingId: 23,
        name: "Philips Welcome Center",
        abbreviation: "PWC",
      }),
      Building.upsert({
        buildingId: 24,
        name: "College of Liberal Arts",
        abbreviation: "CLA",
      }),
      Building.upsert({
        buildingId: 25,
        name: "Graduate School of Theology",
        abbreviation: "GST",
      }),
      Building.upsert({
        buildingId: 26,
        name: "Noble Science Wing",
        abbreviation: "NSW",
      }),
      Building.upsert({
        buildingId: 27,
        name: "Vose Hall",
        abbreviation: "VH",
      }),
      Building.upsert({
        buildingId: 28,
        name: "Registrar",
        abbreviation: "REG",
      }),
      Building.upsert({
        buildingId: 29,
        name: "College of Natural & Health Sciences",
        abbreviation: "CNHS",
      }),
      Building.upsert({
        buildingId: 30,
        name: "Hardeman Auditorium",
        abbreviation: "HA",
      }),
      Building.upsert({
        buildingId: 31,
        name: "North Institute - 3rd Floor",
        abbreviation: "NI",
      }),
      Building.upsert({
        buildingId: 32,
        name: "Vaughn Track",
        abbreviation: "VT",
      }),
      Building.upsert({
        buildingId: 33,
        name: "Counseling Center",
        abbreviation: "CC",
      }),
      Building.upsert({
        buildingId: 34,
        name: "Hartman Place (Remembrance Area)",
        abbreviation: "HP",
      }),
      Building.upsert({
        buildingId: 35,
        name: "Nowlin Center",
        abbreviation: "NC",
      }),
      Building.upsert({
        buildingId: 36,
        name: "Williams-Branch Center for Biblical Studies",
        abbreviation: "WCBS",
      }),
      Building.upsert({
        buildingId: 37,
        name: "Adams Recital Hall",
        abbreviation: "ARH",
      }),
      Building.upsert({
        buildingId: 38,
        name: "Cox Digital Studio",
        abbreviation: "CDS",
      }),
      Building.upsert({
        buildingId: 39,
        name: "Harvey Business Center",
        abbreviation: "HBC",
      }),
      Building.upsert({
        buildingId: 40,
        name: "Payne Athletic Center (The Nest)",
        abbreviation: "PAC",
      }),
      Building.upsert({
        buildingId: 41,
        name: "Admissions - 2nd Floor",
        abbreviation: "A",
      }),
      Building.upsert({
        buildingId: 42,
        name: "David Smith Athletic Center (The Barn)",
        abbreviation: "DSAC",
      }),
      Building.upsert({
        buildingId: 43,
        name: "Help Desk",
        abbreviation: "HD",
      }),
      Building.upsert({
        buildingId: 44,
        name: "Phillips Welcome Center",
        abbreviation: "PWC",
      }),
      Building.upsert({
        buildingId: 45,
        name: "Advancement Housing",
        abbreviation: "AH",
      }),
      Building.upsert({
        buildingId: 46,
        name: "Davisson American Heritage Building",
        abbreviation: "DAHB",
      }),
      Building.upsert({
        buildingId: 47,
        name: "Heritage Plaza",
        abbreviation: "HP",
      }),
    ]);

    console.log("Buildings initialized successfully");
  } catch (error) {
    console.log("Initialization failed:", error);
  }
}

module.exports = { initializeBuildings };
