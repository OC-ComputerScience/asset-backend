const db = require("../models");
const ProfileData = db.profileData;

async function initializeProfileData() {
  try {
    await Promise.all([
      // iPhone 13
      ProfileData.upsert({
        profileDataId: 1,
        field: "Manufacturer",
        data: "Apple",
        profileId: 1,
      }),
      ProfileData.upsert({
        profileDataId: 2,
        field: "Model",
        data: "iPhone 13",
        profileId: 1,
      }),
      ProfileData.upsert({
        profileDataId: 3,
        field: "Storage",
        data: "128GB",
        profileId: 1,
      }),
      ProfileData.upsert({
        profileDataId: 4,
        field: "Operating System",
        data: "iOS 15",
        profileId: 1,
      }),
      // Samsung Galaxy S21
      ProfileData.upsert({
        profileDataId: 5,
        field: "Manufacturer",
        data: "Samsung",
        profileId: 2,
      }),
      ProfileData.upsert({
        profileDataId: 6,
        field: "Model",
        data: "Galaxy S21",
        profileId: 2,
      }),
      ProfileData.upsert({
        profileDataId: 7,
        field: "Storage",
        data: "128GB",
        profileId: 2,
      }),
      ProfileData.upsert({
        profileDataId: 8,
        field: "Operating System",
        data: "Android 11",
        profileId: 2,
      }),
      // Dell XPS 15
      ProfileData.upsert({
        profileDataId: 9,
        field: "Manufacturer",
        data: "Dell",
        profileId: 3,
      }),
      ProfileData.upsert({
        profileDataId: 10,
        field: "Model",
        data: "XPS 15",
        profileId: 3,
      }),
      ProfileData.upsert({
        profileDataId: 11,
        field: "CPU",
        data: "Intel Core i7-10750H",
        profileId: 3,
      }),
      ProfileData.upsert({
        profileDataId: 12,
        field: "Memory Size",
        data: "16GB RAM, 512GB SSD",
        profileId: 3,
      }),
      ProfileData.upsert({
        profileDataId: 13,
        field: "Battery Type",
        data: "56WHr",
        profileId: 3,
      }),
      // MacBook Pro 16"
      ProfileData.upsert({
        profileDataId: 14,
        field: "Manufacturer",
        data: "Apple",
        profileId: 4,
      }),
      ProfileData.upsert({
        profileDataId: 15,
        field: "Model",
        data: "MacBook Pro 16",
        profileId: 4,
      }),
      ProfileData.upsert({
        profileDataId: 16,
        field: "CPU",
        data: "Apple M1 Pro",
        profileId: 4,
      }),
      ProfileData.upsert({
        profileDataId: 17,
        field: "Memory Size",
        data: "16GB RAM, 512GB SSD",
        profileId: 4,
      }),
      ProfileData.upsert({
        profileDataId: 18,
        field: "Battery Type",
        data: "100WHr",
        profileId: 4,
      }),
      // iPad Pro
      ProfileData.upsert({
        profileDataId: 19,
        field: "Manufacturer",
        data: "Apple",
        profileId: 5,
      }),
      ProfileData.upsert({
        profileDataId: 20,
        field: "Model",
        data: "iPad Pro",
        profileId: 5,
      }),
      ProfileData.upsert({
        profileDataId: 21,
        field: "Storage",
        data: "128GB",
        profileId: 5,
      }),
      ProfileData.upsert({
        profileDataId: 22,
        field: "Screen Size",
        data: "12.9 inches",
        profileId: 5,
      }),
      // Lenovo ThinkPad X1 Carbon
      ProfileData.upsert({
        profileDataId: 23,
        field: "Manufacturer",
        data: "Lenovo",
        profileId: 6,
      }),
      ProfileData.upsert({
        profileDataId: 24,
        field: "Model",
        data: "ThinkPad X1 Carbon",
        profileId: 6,
      }),
      ProfileData.upsert({
        profileDataId: 25,
        field: "CPU",
        data: "Intel Core i7-10510U",
        profileId: 6,
      }),
      ProfileData.upsert({
        profileDataId: 26,
        field: "Memory Size",
        data: "16GB RAM, 1TB SSD",
        profileId: 6,
      }),
      ProfileData.upsert({
        profileDataId: 27,
        field: "Battery Type",
        data: "51WHr",
        profileId: 6,
      }),
      ProfileData.upsert({
        profileDataId: 28,
        field: "Screen Size",
        data: "14 inches",
        profileId: 6,
      }),
      // Canon EOS R5
      ProfileData.upsert({
        profileDataId: 29,
        field: "Manufacturer",
        data: "Canon",
        profileId: 7,
      }),
      ProfileData.upsert({
        profileDataId: 30,
        field: "Model",
        data: "EOS R5",
        profileId: 7,
      }),
      ProfileData.upsert({
        profileDataId: 31,
        field: "Lenses",
        data: "RF Mount",
        profileId: 7,
      }),
      ProfileData.upsert({
        profileDataId: 32,
        field: "Camera Type",
        data: "Mirrorless",
        profileId: 7,
      }),
      ProfileData.upsert({
        profileDataId: 33,
        field: "Megapixels",
        data: "45",
        profileId: 7,
      }),
      // Sony Alpha A7 III
      ProfileData.upsert({
        profileDataId: 34,
        field: "Manufacturer",
        data: "Sony",
        profileId: 8,
      }),
      ProfileData.upsert({
        profileDataId: 35,
        field: "Model",
        data: "Alpha A7 III",
        profileId: 8,
      }),
      ProfileData.upsert({
        profileDataId: 36,
        field: "Lenses",
        data: "E-mount",
        profileId: 8,
      }),
      ProfileData.upsert({
        profileDataId: 37,
        field: "Camera Type",
        data: "Mirrorless",
        profileId: 8,
      }),
      ProfileData.upsert({
        profileDataId: 38,
        field: "Megapixels",
        data: "24.2",
        profileId: 8,
      }),
      // Poly Studio X50
      ProfileData.upsert({
        profileDataId: 39,
        field: "Manufacturer",
        data: "Poly",
        profileId: 9,
      }),
      ProfileData.upsert({
        profileDataId: 40,
        field: "Model",
        data: "Studio X50",
        profileId: 9,
      }),
      ProfileData.upsert({
        profileDataId: 41,
        field: "Resolution",
        data: "4K",
        profileId: 9,
      }),
      // Google Pixel 6
      ProfileData.upsert({
        profileDataId: 42,
        field: "Manufacturer",
        data: "Google",
        profileId: 10,
      }),
      ProfileData.upsert({
        profileDataId: 43,
        field: "Model",
        data: "Pixel 6",
        profileId: 10,
      }),
      ProfileData.upsert({
        profileDataId: 44,
        field: "Storage",
        data: "128GB",
        profileId: 10,
      }),
      ProfileData.upsert({
        profileDataId: 45,
        field: "Operating System",
        data: "Android 12",
        profileId: 10,
      }),
      // HP Spectre x360
      ProfileData.upsert({
        profileDataId: 46,
        field: "Manufacturer",
        data: "HP",
        profileId: 11,
      }),
      ProfileData.upsert({
        profileDataId: 47,
        field: "Model",
        data: "Spectre x360",
        profileId: 11,
      }),
      ProfileData.upsert({
        profileDataId: 48,
        field: "CPU",
        data: "Intel Core i7-1065G7",
        profileId: 11,
      }),
      ProfileData.upsert({
        profileDataId: 49,
        field: "Memory Size",
        data: "16GB RAM, 1TB SSD",
        profileId: 11,
      }),
      ProfileData.upsert({
        profileDataId: 50,
        field: "Battery Type",
        data: "60WHr",
        profileId: 11,
      }),
      ProfileData.upsert({
        profileDataId: 51,
        field: "Screen Size",
        data: "13.3 inches",
        profileId: 11,
      }),
      // Microsoft Surface Pro 7
      ProfileData.upsert({
        profileDataId: 52,
        field: "Manufacturer",
        data: "Microsoft",
        profileId: 12,
      }),
      ProfileData.upsert({
        profileDataId: 53,
        field: "Model",
        data: "Surface Pro 7",
        profileId: 12,
      }),
      ProfileData.upsert({
        profileDataId: 54,
        field: "Storage",
        data: "256GB SSD",
        profileId: 12,
      }),
      ProfileData.upsert({
        profileDataId: 55,
        field: "Screen Size",
        data: "12.3 inches",
        profileId: 12,
      }),
      // Epson EcoTank L3150
      ProfileData.upsert({
        profileDataId: 56,
        field: "Manufacturer",
        data: "Epson",
        profileId: 13,
      }),
      ProfileData.upsert({
        profileDataId: 57,
        field: "Model",
        data: "EcoTank L3150",
        profileId: 13,
      }),
      ProfileData.upsert({
        profileDataId: 58,
        field: "Color Type",
        data: "Color",
        profileId: 13,
      }),
      ProfileData.upsert({
        profileDataId: 59,
        field: "Print Speed",
        data: "10 ppm (Black), 5 ppm (Color)",
        profileId: 13,
      }),
      // Logitech C920 HD Pro
      ProfileData.upsert({
        profileDataId: 60,
        field: "Manufacturer",
        data: "Logitech",
        profileId: 14,
      }),
      ProfileData.upsert({
        profileDataId: 61,
        field: "Model",
        data: "C920 HD Pro",
        profileId: 14,
      }),
      ProfileData.upsert({
        profileDataId: 62,
        field: "Resolution",
        data: "1080p",
        profileId: 14,
      }),
      // Netgear Nighthawk R7000
      ProfileData.upsert({
        profileDataId: 63,
        field: "Manufacturer",
        data: "Netgear",
        profileId: 15,
      }),
      ProfileData.upsert({
        profileDataId: 64,
        field: "Model",
        data: "Nighthawk R7000",
        profileId: 15,
      }),
      ProfileData.upsert({
        profileDataId: 65,
        field: "Number of Ports",
        data: "5",
        profileId: 15,
      }),
      ProfileData.upsert({
        profileDataId: 66,
        field: "Speed",
        data: "AC1900 (600Mbps + 1300Mbps)",
        profileId: 15,
      }),
      // Ubiquiti UniFi Switch
      ProfileData.upsert({
        profileDataId: 67,
        field: "Manufacturer",
        data: "Ubiquiti Networks",
        profileId: 16,
      }),
      ProfileData.upsert({
        profileDataId: 68,
        field: "Model",
        data: "UniFi Switch",
        profileId: 16,
      }),
      ProfileData.upsert({
        profileDataId: 69,
        field: "Number of Ports",
        data: "24",
        profileId: 16,
      }),
      ProfileData.upsert({
        profileDataId: 70,
        field: "Speed",
        data: "1Gbps",
        profileId: 16,
      }),
      // Dell PowerEdge T40
      ProfileData.upsert({
        profileDataId: 71,
        field: "Manufacturer",
        data: "Dell",
        profileId: 17,
      }),
      ProfileData.upsert({
        profileDataId: 72,
        field: "Model",
        data: "PowerEdge T40",
        profileId: 17,
      }),
      ProfileData.upsert({
        profileDataId: 73,
        field: "CPU",
        data: "Intel Xeon E-2224G",
        profileId: 17,
      }),
      ProfileData.upsert({
        profileDataId: 74,
        field: "Memory Size",
        data: "8GB RAM",
        profileId: 17,
      }),
      ProfileData.upsert({
        profileDataId: 75,
        field: "Storage",
        data: "1TB HDD",
        profileId: 17,
      }),
      // Yamaha DXR8
      ProfileData.upsert({
        profileDataId: 76,
        field: "Manufacturer",
        data: "Yamaha",
        profileId: 18,
      }),
      ProfileData.upsert({
        profileDataId: 77,
        field: "Model",
        data: "DXR8",
        profileId: 18,
      }),
      ProfileData.upsert({
        profileDataId: 78,
        field: "Description",
        data: "8-inch powered loudspeaker, versatile for live sound and installation",
        profileId: 18,
      }),
      // Office Door Key
      ProfileData.upsert({
        profileDataId: 79,
        field: "Room No",
        data: "101",
        profileId: 19,
      }),
      // Server Room Key
      ProfileData.upsert({
        profileDataId: 80,
        field: "Room No",
        data: "Server Room A",
        profileId: 20,
      }),
      // Master Key
      ProfileData.upsert({
        profileDataId: 81,
        field: "Room No",
        data: "All Access",
        profileId: 21,
      }),
      // Generic Landline Phone
      ProfileData.upsert({
        profileDataId: 82,
        field: "Manufacturer",
        data: "Generic",
        profileId: 22,
      }),
      ProfileData.upsert({
        profileDataId: 83,
        field: "Model",
        data: "Basic Model",
        profileId: 22,
      }),
      ProfileData.upsert({
        profileDataId: 84,
        field: "Type",
        data: "Corded",
        profileId: 22,
      }),
      ProfileData.upsert({
        profileDataId: 85,
        field: "Features",
        data: "Caller ID, Speakerphone",
        profileId: 22,
      }),
      // Basic Fax Machine
      ProfileData.upsert({
        profileDataId: 86,
        field: "Manufacturer",
        data: "Generic",
        profileId: 23,
      }),
      ProfileData.upsert({
        profileDataId: 87,
        field: "Model",
        data: "Fax2000",
        profileId: 23,
      }),
      ProfileData.upsert({
        profileDataId: 88,
        field: "Transmission Speed",
        data: "33.6 Kbps",
        profileId: 23,
      }),
      ProfileData.upsert({
        profileDataId: 89,
        field: "Paper Capacity",
        data: "100 sheets",
        profileId: 23,
      }),
      // Smart Board
      ProfileData.upsert({
        profileDataId: 90,
        field: "Screen Size",
        data: "75 inches",
        profileId: 24,
      }),
      ProfileData.upsert({
        profileDataId: 91,
        field: "Connectivity",
        data: "HDMI, USB, Bluetooth",
        profileId: 24,
      }),
      ProfileData.upsert({
        profileDataId: 92,
        field: "Interactive Features",
        data: "Multi-touch, Digital Pen Support, Erase with Palm",
        profileId: 24,
      }),
      // Epson PowerLite 1781W
      ProfileData.upsert({
        profileDataId: 93,
        field: "Manufacturer",
        data: "Epson",
        profileId: 25,
      }),
      ProfileData.upsert({
        profileDataId: 94,
        field: "Model",
        data: "PowerLite 1781W",
        profileId: 25,
      }),
      ProfileData.upsert({
        profileDataId: 95,
        field: "Bulb Type",
        data: "Laser",
        profileId: 25,
      }),
      ProfileData.upsert({
        profileDataId: 96,
        field: "Resolution",
        data: "WXGA (1280x800)",
        profileId: 25,
      }),
      // BenQ TK850
      ProfileData.upsert({
        profileDataId: 97,
        field: "Manufacturer",
        data: "BenQ",
        profileId: 26,
      }),
      ProfileData.upsert({
        profileDataId: 98,
        field: "Model",
        data: "TK850",
        profileId: 26,
      }),
      ProfileData.upsert({
        profileDataId: 99,
        field: "Bulb Type",
        data: "DLP",
        profileId: 26,
      }),
      ProfileData.upsert({
        profileDataId: 100,
        field: "Resolution",
        data: "4K UHD (3840x2160)",
        profileId: 26,
      }),
      // Daikin Inverter HVAC
      ProfileData.upsert({
        profileDataId: 101,
        field: "Manufacturer",
        data: "Daikin",
        profileId: 27,
      }),

      ProfileData.upsert({
        profileDataId: 102,
        field: "Model",
        data: "Inverter HVAC",
        profileId: 27,
      }),

      ProfileData.upsert({
        profileDataId: 103,
        field: "Capacity",
        data: "2.5 Tons",
        profileId: 27,
      }),
      // Cisco Catalyst 9000
      ProfileData.upsert({
        profileDataId: 104,
        field: "Manufacturer",
        data: "Cisco",
        profileId: 28,
      }),

      ProfileData.upsert({
        profileDataId: 105,
        field: "Model",
        data: "Catalyst 9000",
        profileId: 28,
      }),

      ProfileData.upsert({
        profileDataId: 106,
        field: "Number of Ports",
        data: "48",
        profileId: 28,
      }),

      ProfileData.upsert({
        profileDataId: 107,
        field: "Speed",
        data: "10 Gbps",
        profileId: 28,
      }),
    ]);
    console.log("ProfileData initialized successfully");
  } catch (error) {
    console.log("Initialization failed:", error);
  }
}

module.exports = { initializeProfileData };
