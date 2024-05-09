const db = require("../models");
const AssetProfile = db.assetProfile;
const serializedAsset = db.serializedAsset;

async function initializeSerializedAssets() {
  try {
    // Fetch all asset profiles
    const profiles = await AssetProfile.findAll();
    const profileMap = profiles.reduce((map, profile) => {
      map[profile.profileId] = profile;
      return map;
    }, {});

    const serializedAssets = [
      {
        serializedAssetId: 1,
        serialNumber: "100001",
        profileId: 1,
        notes: "Apple smartphone with A15 Bionic chip.",
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 2,
        serialNumber: "100002",
        profileId: 1,
        notes: "Apple smartphone with A15 Bionic chip.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 3,
        serialNumber: "100003",
        profileId: 1,
        notes: "Apple smartphone with A15 Bionic chip.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 4,
        serialNumber: "100004",
        profileId: 1,
        notes: "Apple smartphone with A15 Bionic chip.",
        activeStatus: 1,
        checkoutStatus: 1,
        disposalDate: "2024-04-05 00:00:00", // A week after the acquisition date for profileId 1
        disposalMethod: "Recycled",
        disposalNotes:
          "Defective screen, recycled in accordance with e-waste regulations.",
        disposalPrice: null, // No price for recycling
      },
      {
        serializedAssetId: 5,
        serialNumber: "100005",
        profileId: 2,
        notes: "Android smartphone with high-resolution camera.",
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 6,
        serialNumber: "100006",
        profileId: 2,
        notes: "Android smartphone with high-resolution camera.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 7,
        serialNumber: "100007",
        profileId: 2,
        notes: "Android smartphone with high-resolution camera.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 8,
        serialNumber: "100008",
        profileId: 2,
        notes: "Android smartphone with high-resolution camera.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2024-04-06 00:00:00", // A week after the acquisition date for profileId 2
        disposalMethod: "Donated",
        disposalNotes: "Donated to local community center for educational use.",
        disposalPrice: null, // Donations do not have a sale price
      },
      {
        serializedAssetId: 9,
        serialNumber: "100009",
        profileId: 3,
        notes: "High-performance laptop with Intel Core i7 processor.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 10,
        serialNumber: "100010",
        profileId: 3,
        notes: "High-performance laptop with Intel Core i7 processor.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 11,
        serialNumber: "100011",
        profileId: 3,
        notes: "High-performance laptop with Intel Core i7 processor.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 12,
        serialNumber: "100012",
        profileId: 3,
        notes: "High-performance laptop with Intel Core i7 processor.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2024-01-22 00:00:00", // A week after the acquisition date for profileId 3
        disposalMethod: "Scrapped",
        disposalNotes: "Hardware failure deemed not cost-effective to repair.",
        disposalPrice: null, // Scrapped items have no sale value
      },
      {
        serializedAssetId: 13,
        serialNumber: "100013",
        profileId: 4,
        notes: "Apple laptop with M1 Pro chip.",
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 14,
        serialNumber: "100014",
        profileId: 4,
        notes: "Apple laptop with M1 Pro chip.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 15,
        serialNumber: "100015",
        profileId: 4,
        notes: "Apple laptop with M1 Pro chip.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2023-11-12 00:00:00", // A week after the acquisition date for profileId 4
        disposalMethod: "Sold",
        disposalNotes: "Sold as part of technology refresh program.",
        disposalPrice: 500, // Price at which it was sold
      },
      {
        serializedAssetId: 16,
        serialNumber: "100016",
        profileId: 5,
        notes: "Apple tablet with Liquid Retina display.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 17,
        serialNumber: "100017",
        profileId: 5,
        notes: "Apple tablet with Liquid Retina display.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2023-09-27 00:00:00", // A week after the acquisition date for profileId 5
        disposalMethod: "Recycled",
        disposalNotes:
          "Screen cracked, recycled according to e-waste guidelines.",
        disposalPrice: null, // Recycled items do not have a sale value
      },
      {
        serializedAssetId: 18,
        serialNumber: "100018",
        profileId: 6,
        notes: "Ultralight business laptop with Intel Core i7 processor.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 19,
        serialNumber: "100019",
        profileId: 6,
        notes: "Ultralight business laptop with Intel Core i7 processor.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2023-07-22 00:00:00", // A week after the acquisition date for profileId 6
        disposalMethod: "Donated",
        disposalNotes: "Donated to tech startup incubator.",
        disposalPrice: null, // Donations have no sale price
      },
      {
        serializedAssetId: 20,
        serialNumber: "100020",
        profileId: 7,
        notes: "Professional mirrorless camera.",
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 21,
        serialNumber: "100021",
        profileId: 7,
        notes: "Professional mirrorless camera.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2023-06-06 00:00:00", // A week after the acquisition date for profileId 7
        disposalMethod: "Sold",
        disposalNotes: "Upgraded to newer model, sold the previous unit.",
        disposalPrice: 150, // Sale price for the sold camera
      },
      {
        serializedAssetId: 22,
        serialNumber: "100022",
        profileId: 8,
        notes: "Full-frame mirrorless camera with advanced autofocus.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 23,
        serialNumber: "100023",
        profileId: 8,
        notes: "Full-frame mirrorless camera with advanced autofocus.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 24,
        serialNumber: "100024",
        profileId: 8,
        notes: "Full-frame mirrorless camera with advanced autofocus.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2023-04-07 00:00:00", // A week after the acquisition date for profileId 8
        disposalMethod: "Recycled",
        disposalNotes: "Damaged beyond repair, recycled for parts.",
        disposalPrice: null, // No sale price for recycled units
      },
      {
        serializedAssetId: 25,
        serialNumber: "100025",
        profileId: 9,
        notes: "Video conferencing bar with 4K support.",
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 26,
        serialNumber: "100026",
        profileId: 9,
        notes: "Video conferencing bar with 4K support.",
        activeStatus: 1,
        checkoutStatus: 6,
      },
      {
        serializedAssetId: 27,
        serialNumber: "100027",
        profileId: 10,
        notes: "Android smartphone with Google Tensor processor.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 28,
        serialNumber: "100028",
        profileId: 10,
        notes: "Android smartphone with Google Tensor processor.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2022-11-16 00:00:00", // A week after the acquisition date for profileId 10
        disposalMethod: "Scrapped",
        disposalNotes: "Irreparable damage to the motherboard.",
        disposalPrice: null, // No sale price for scrapped items
      },
      {
        serializedAssetId: 29,
        serialNumber: "100029",
        profileId: 11,
        notes: "Convertible laptop with touch screen and pen support.",
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 30,
        serialNumber: "100030",
        profileId: 11,
        notes: "Convertible laptop with touch screen and pen support.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 31,
        serialNumber: "100031",
        profileId: 11,
        notes: "Convertible laptop with touch screen and pen support.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2022-10-22 00:00:00", // A week after the acquisition date for profileId 11
        disposalMethod: "Donated",
        disposalNotes: "Donated to local school for digital art program.",
        disposalPrice: null, // Donations do not have a sale price
      },
      {
        serializedAssetId: 32,
        serialNumber: "100032",
        profileId: 12,
        notes: "Windows tablet with detachable keyboard.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 33,
        serialNumber: "100033",
        profileId: 12,
        notes: "Windows tablet with detachable keyboard.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 34,
        serialNumber: "100034",
        profileId: 12,
        notes: "Windows tablet with detachable keyboard.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2022-08-05 00:00:00", // A week after the acquisition date for profileId 12
        disposalMethod: "Recycled",
        disposalNotes: "Recycled due to obsolescence and non-functionality.",
        disposalPrice: null, // Recycled items do not have a sale value
      },
      {
        serializedAssetId: 35,
        serialNumber: "100035",
        profileId: 13,
        notes: "Wi-Fi All-in-One Ink Tank Printer.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 36,
        serialNumber: "100036",
        profileId: 13,
        notes: "Wi-Fi All-in-One Ink Tank Printer.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 37,
        serialNumber: "100037",
        profileId: 13,
        notes: "Wi-Fi All-in-One Ink Tank Printer.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2022-07-17 00:00:00", // A week after the acquisition date for profileId 13
        disposalMethod: "Sold",
        disposalNotes: "Sold due to upgrade to a newer model.",
        disposalPrice: 150, // Sale price for sold printer
      },
      {
        serializedAssetId: 38,
        serialNumber: "100038",
        profileId: 14,
        notes: "Webcam for HD video streaming.",
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 39,
        serialNumber: "100039",
        profileId: 14,
        notes: "Webcam for HD video streaming.",
        activeStatus: 1,
        checkoutStatus: 1,
        disposalDate: "2022-06-02 00:00:00", // A week after the acquisition date for profileId 14
        disposalMethod: "Recycled",
        disposalNotes:
          "Defective and replaced under warranty, recycled the old unit.",
        disposalPrice: null, // Recycled items do not have a sale price
      },
      {
        serializedAssetId: 40,
        serialNumber: "100040",
        profileId: 15,
        notes: "Wi-Fi router for high-speed internet.",
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 41,
        serialNumber: "100041",
        profileId: 15,
        notes: "Wi-Fi router for high-speed internet.",
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 42,
        serialNumber: "100042",
        profileId: 15,
        notes: "Wi-Fi router for high-speed internet.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2022-04-22 00:00:00", // A week after the acquisition date for profileId 15
        disposalMethod: "Sold",
        disposalNotes: "Sold due to technology upgrade.",
        disposalPrice: 200, // Sale price for sold router
      },
      {
        serializedAssetId: 43,
        serialNumber: "100043",
        profileId: 16,
        notes: "Managed PoE+ Gigabit Switch with SFP.",
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 44,
        serialNumber: "100044",
        profileId: 16,
        notes: "Managed PoE+ Gigabit Switch with SFP.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 45,
        serialNumber: "100045",
        profileId: 16,
        notes: "Managed PoE+ Gigabit Switch with SFP.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2022-03-07 00:00:00", // A week after the acquisition date for profileId 16
        disposalMethod: "Donated",
        disposalNotes: "Donated to educational institute for networking lab.",
        disposalPrice: null, // Donations have no sale price
      },
      {
        serializedAssetId: 46,
        serialNumber: "100046",
        profileId: 17,
        notes: "Server tower with Intel Xeon processor.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 47,
        serialNumber: "100047",
        profileId: 17,
        notes: "Server tower with Intel Xeon processor.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 48,
        serialNumber: "100048",
        profileId: 17,
        notes: "Server tower with Intel Xeon processor.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2022-01-12 00:00:00", // A week after the acquisition date for profileId 17
        disposalMethod: "Recycled",
        disposalNotes: "Recycled due to obsolescence.",
        disposalPrice: null, // Recycled items do not have a sale price
      },
      {
        serializedAssetId: 49,
        serialNumber: "100049",
        profileId: 18,
        notes: "Active loudspeaker for live sound reinforcement.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 50,
        serialNumber: "100050",
        profileId: 18,
        notes: "Active loudspeaker for live sound reinforcement.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2021-11-27 00:00:00", // A week after the acquisition date for profileId 18
        disposalMethod: "Donated",
        disposalNotes: "Donated to local community theater.",
        disposalPrice: null, // Donations have no sale price
      },
      {
        serializedAssetId: 51,
        serialNumber: "100051",
        profileId: 19,
        notes: "Key for Main Office Door #1.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 52,
        serialNumber: "100052",
        profileId: 19,
        notes: "Key for Main Office Door #1.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 53,
        serialNumber: "100053",
        profileId: 19,
        notes: "Key for Main Office Door #1.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2021-09-06 00:00:00", // A week after the acquisition date for profileId 19
        disposalMethod: "Recycled",
        disposalNotes: "Replaced due to security protocol update.",
        disposalPrice: null, // Recycled items do not have a sale price
      },
      {
        serializedAssetId: 54,
        serialNumber: "100054",
        profileId: 20,
        notes: "Access key for Central Server Room.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 55,
        serialNumber: "100055",
        profileId: 20,
        notes: "Access key for Central Server Room.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 56,
        serialNumber: "100056",
        profileId: 21,
        notes:
          "Main Building Master Key. Grants access to all offices, server rooms, and restricted areas.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 57,
        serialNumber: "100057",
        profileId: 21,
        notes:
          "Main Building Master Key. Grants access to all offices, server rooms, and restricted areas.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 58,
        serialNumber: "100058",
        profileId: 22,
        notes:
          "Standard wired telephone used for voice communication in homes and offices.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2021-06-24 00:00:00", // A week after the acquisition date for profileId 22
        disposalMethod: "Recycled",
        disposalNotes:
          "Obsolete technology, recycled in an environmentally friendly manner.",
        disposalPrice: null, // Recycled items do not have a sale price
      },
      {
        serializedAssetId: 59,
        serialNumber: "100059",
        profileId: 23,
        notes:
          "Device for sending and receiving documents over telephone lines.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2021-04-11 00:00:00", // A week after the acquisition date for profileId 23
        disposalMethod: "Sold",
        disposalNotes:
          "Due to decreased need for fax in modern digital communication, sold to a business still requiring fax capabilities.",
        disposalPrice: 50, // Sale price for fax machine
      },
      {
        serializedAssetId: 60,
        serialNumber: "100060",
        profileId: 24,
        notes: "Interactive whiteboard with multi-touch capabilities.",
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 61,
        serialNumber: "100061",
        profileId: 24,
        notes: "Smart Board optimized for educational applications.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 62,
        serialNumber: "100062",
        profileId: 24,
        notes: "High-resolution Smart Board with digital pen support.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2021-04-26 00:00:00", // A week after the acquisition date for profileId 24
        disposalMethod: "Donated",
        disposalNotes:
          "Updated to newer models, donated the older versions to schools.",
        disposalPrice: null, // Donations have no sale price
      },
      {
        serializedAssetId: 63,
        serialNumber: "100063",
        profileId: 25,
        notes:
          "Epson PowerLite 1781W, WXGA, 3200 lumens, wireless connectivity.",
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 64,
        serialNumber: "100064",
        profileId: 25,
        notes:
          "Epson PowerLite 1781W, lightweight design, ideal for mobile presentations.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 65,
        serialNumber: "100065",
        profileId: 25,
        notes:
          "Epson PowerLite 1781W, WXGA, 3200 lumens, wireless connectivity.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2021-03-14 00:00:00", // A week after the acquisition date for profileId 25
        disposalMethod: "Sold",
        disposalNotes: "Surplus to requirements, sold to another organization.",
        disposalPrice: 300, // Sale price for projector
      },
      {
        serializedAssetId: 66,
        serialNumber: "100066",
        profileId: 26,
        notes:
          "BenQ TK850, 4K HDR, 3000 lumens, designed for well-lit environments.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 67,
        serialNumber: "100067",
        profileId: 26,
        notes:
          "BenQ TK850, offers true 4K UHD resolution with HDR-PRO, perfect for home theater.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 68,
        serialNumber: "100068",
        profileId: 26,
        notes: "BenQ TK850, 4K HDR, designed for well-lit environments.",
        activeStatus: 0, // Set to inactive
        checkoutStatus: 0,
        disposalDate: "2021-02-21 00:00:00", // A week after the acquisition date for profileId 26
        disposalMethod: "Recycled",
        disposalNotes: "Replaced with advanced models, recycled old units.",
        disposalPrice: null, // Recycled items do not have a sale value
      },
      {
        serializedAssetId: 69,
        serialNumber: "200001",
        profileId: 27, // Daikin Inverter HVAC
        notes:
          "Unit installed in main office building, providing efficient temperature control.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 70,
        serialNumber: "200002",
        profileId: 27, // Daikin Inverter HVAC
        notes:
          "Unit installed in secondary office location, providing efficient temperature control.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 71,
        serialNumber: "200003",
        profileId: 28, // Cisco Catalyst 9000
        notes:
          "Primary network switch at data center, handling all incoming and outgoing digital traffic.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 72,
        serialNumber: "200004",
        profileId: 28, // Cisco Catalyst 9000
        notes:
          "Backup network switch stored in secure IT room for redundancy purposes.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 73,
        serialNumber: "200005",
        profileId: 29, // Shure SM7B
        notes:
          "Microphone used in corporate studio for podcast recording and high-quality broadcasts.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 74,
        serialNumber: "200006",
        profileId: 29, // Shure SM7B
        notes:
          "Spare microphone kept for guest use during live events and presentations.",
        activeStatus: 1,
        checkoutStatus: 0,
      },
      {
        serializedAssetId: 75,
        serialNumber: "200007",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 76,
        serialNumber: "200008",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 77,
        serialNumber: "200009",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 78,
        serialNumber: "200010",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 79,
        serialNumber: "200011",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 80,
        serialNumber: "200012",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 81,
        serialNumber: "200013",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 82,
        serialNumber: "200014",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 83,
        serialNumber: "200015",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 84,
        serialNumber: "200016",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 85,
        serialNumber: "200017",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 86,
        serialNumber: "200018",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 87,
        serialNumber: "200019",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 88,
        serialNumber: "200020",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 89,
        serialNumber: "200021",
        profileId: 27, // Daikin Inverter HVAC
        notes: null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 90,
        serialNumber: "200022",
        profileId: 21, // key
        notes:
          null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 91,
        serialNumber: "200023",
        profileId: 19, // key
        notes:
          null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
      {
        serializedAssetId: 92,
        serialNumber: "200024",
        profileId: 20, // key
        notes:
          null,
        activeStatus: 1,
        checkoutStatus: 1,
      },
    ].map((asset) => ({
      ...asset,
      purchasePrice: profileMap[asset.profileId]
        ? profileMap[asset.profileId].purchasePrice
        : null,
      acquisitionDate: profileMap[asset.profileId]
        ? profileMap[asset.profileId].acquisitionDate
        : null,
    }));

    // Upsert all serialized assets with the additional profile data
    await Promise.all(
      serializedAssets.map((serialAsset) =>
        serializedAsset.upsert({ ...serialAsset })
      )
    );
    console.log("Serialized Assets initialized successfully");
  } catch (error) {
    console.log("Initialization failed:", error);
  }
}

module.exports = { initializeSerializedAssets };
