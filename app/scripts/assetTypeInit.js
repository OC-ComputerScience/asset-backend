const db = require("../models");
const assetType = db.assetType;

async function initializeAssetType() {
  const types = [
    {
      typeId: 1,
      typeName: "Smartphone",
      categoryId: 1,
      desc: "Handheld communication devices that offer advanced computing abilities.",
      activeStatus: 1,
      dynamicFields: JSON.stringify([
        { fieldName: "Manufacturer", fieldType: "text", fieldValue: "" },
        { fieldName: "Model", fieldType: "text", fieldValue: "" },
        { fieldName: "Storage", fieldType: "text", fieldValue: "" },
        { fieldName: "Operating System", fieldType: "text", fieldValue: "" },
      ]),
    },
    {
      typeId: 2,
      typeName: "Laptop",
      categoryId: 1,
      desc: "Portable personal computers with integrated keyboards and screens.",
      activeStatus: 1,
      dynamicFields: JSON.stringify([
        { fieldName: "Manufacturer", fieldType: "text", fieldValue: "" },
        { fieldName: "Model", fieldType: "text", fieldValue: "" },
        { fieldName: "CPU", fieldType: "text", fieldValue: "" },
        { fieldName: "Memory Size", fieldType: "text", fieldValue: "" },
        { fieldName: "Battery Type", fieldType: "text", fieldValue: "" },
      ]),
    },
    {
      typeId: 3,
      typeName: "Tablet",
      categoryId: 1,
      desc: "Portable computing devices with touchscreen interfaces.",
      activeStatus: 1,
      dynamicFields: JSON.stringify([
        { fieldName: "Manufacturer", fieldType: "text", fieldValue: "" },
        { fieldName: "Model", fieldType: "text", fieldValue: "" },
        { fieldName: "Storage", fieldType: "text", fieldValue: "" },
        { fieldName: "Screen Size", fieldType: "text", fieldValue: "" },
      ]),
    },
    {
      typeId: 4,
      typeName: "HVAC System",
      categoryId: 3,
      desc: "Heating, ventilation, and air conditioning units for climate control.",
      activeStatus: 1,
      dynamicFields: JSON.stringify([
        { fieldName: "Manufacturer", fieldType: "text", fieldValue: "" },
        { fieldName: "Model", fieldType: "text", fieldValue: "" },
        { fieldName: "Capacity", fieldType: "text", fieldValue: "" },

      ]),
    },
    {
      typeId: 5,
      typeName: "Projector",
      categoryId: 1,
      desc: "Devices that project images or videos onto surfaces.",
      activeStatus: 1,
      dynamicFields: JSON.stringify([
        { fieldName: "Manufacturer", fieldType: "text", fieldValue: "" },
        { fieldName: "Model", fieldType: "text", fieldValue: "" },
        { fieldName: "Bulb Type", fieldType: "text", fieldValue: "" },
        { fieldName: "Resolution", fieldType: "text", fieldValue: "" },
      ]),
    },
    {
      typeId: 6,
      typeName: "Network Switch",
      categoryId: 1,
      desc: "Networking devices that connect multiple devices together on a computer network.",
      activeStatus: 1,
      dynamicFields: JSON.stringify([
        { fieldName: "Manufacturer", fieldType: "text", fieldValue: "" },
        { fieldName: "Model", fieldType: "text", fieldValue: "" },
        { fieldName: "Number of Ports", fieldType: "text", fieldValue: "" },
        { fieldName: "Speed", fieldType: "text", fieldValue: "" },
      ]),
    },
    {
      typeId: 7,
      typeName: "Server",
      categoryId: 1,
      desc: "Computers designed to process requests and deliver data to other computers over a local network or the internet.",
      activeStatus: 1,
      dynamicFields: JSON.stringify([
        { fieldName: "Manufacturer", fieldType: "text", fieldValue: "" },
        { fieldName: "Model", fieldType: "text", fieldValue: "" },
        { fieldName: "CPU", fieldType: "text", fieldValue: "" },
        { fieldName: "Memory Size", fieldType: "text", fieldValue: "" },
        { fieldName: "Storage", fieldType: "text", fieldValue: "" },
      ]),
    },
    {
      typeId: 8,
      typeName: "Desktop Computer",
      categoryId: 1,
      desc: "Personal computers designed for regular use at a single location.",
      activeStatus: 1,
      dynamicFields: JSON.stringify([
        { fieldName: "Manufacturer", fieldType: "text", fieldValue: "" },
        { fieldName: "Model", fieldType: "text", fieldValue: "" },
        { fieldName: "CPU", fieldType: "text", fieldValue: "" },
        { fieldName: "Memory Size", fieldType: "text", fieldValue: "" },
        { fieldName: "Battery Type", fieldType: "text", fieldValue: "" },
      ]),
    },
    {
      typeId: 9,
      typeName: "Printer",
      categoryId: 1,
      desc: "Devices that produce a hard copy of documents stored on a computer or other device.",
      activeStatus: 1,
      dynamicFields: JSON.stringify([
        { fieldName: "Manufacturer", fieldType: "text", fieldValue: "" },
        { fieldName: "Model", fieldType: "text", fieldValue: "" },
        { fieldName: "Color Type", fieldType: "text", fieldValue: "" },
        { fieldName: "printSpeed", fieldType: "text", fieldValue: "" },
      ]),
    },
    {
      typeId: 10,
      typeName: "Microphone",
      categoryId: 1,
      desc: "Devices that convert sound into electrical signals for recording or amplification.",
      activeStatus: 1,
      dynamicFields: JSON.stringify([
        { fieldName: "Manufacturer", fieldType: "text", fieldValue: "" },
        { fieldName: "Model", fieldType: "text", fieldValue: "" },
      ]),
    },
    {
      typeId: 11,
      typeName: "Camera",
      categoryId: 2,
      desc: "Devices used to capture images or videos.",
      activeStatus: 1,
      dynamicFields: JSON.stringify([
        { fieldName: "Manufacturer", fieldType: "text", fieldValue: "" },
        { fieldName: "Model", fieldType: "text", fieldValue: "" },
        { fieldName: "Lenses", fieldType: "text", fieldValue: "" },
        { fieldName: "Camera Type", fieldType: "text", fieldValue: "" },
        { fieldName: "Megapixels", fieldType: "text", fieldValue: "" },
      ]),
    },
    {
      typeId: 12,
      typeName: "Video Conferencing System",
      categoryId: 1,
      desc: "Equipment used to conduct video communication sessions between two or more locations.",
      activeStatus: 1,
      dynamicFields: JSON.stringify([
        { fieldName: "Manufacturer", fieldType: "text", fieldValue: "" },
        { fieldName: "Model", fieldType: "text", fieldValue: "" },
        { fieldName: "Resolution", fieldType: "text", fieldValue: "" },
      ]),
    },
    {
      typeId: 13,
      typeName: "Key",
      categoryId: 3,
      desc: "Physical keys used for access control and security purposes.",
      activeStatus: 1,
      dynamicFields: JSON.stringify([
        { fieldName: "Room No", fieldType: "text", fieldValue: "" },
      ]),
    },
    {
      typeId: 14,
      typeName: "Landline Phone",
      categoryId: 1,
      desc: "Traditional wired telephone systems for voice communication.",
      activeStatus: 0,
      dynamicFields: JSON.stringify([
        { fieldName: "Manufacturer", fieldType: "text", fieldValue: "" },
        { fieldName: "Model", fieldType: "text", fieldValue: "" },
        { fieldName: "Type", fieldType: "text", fieldValue: "" },
        { fieldName: "Features", fieldType: "text", fieldValue: "" },
      ]),
    },
    {
      typeId: 15,
      typeName: "Fax Machine",
      categoryId: 1,
      desc: "Devices used to send and receive documents over telephone lines.",
      activeStatus: 0,
      dynamicFields: JSON.stringify([
        { fieldName: "Manufacturer", fieldType: "text", fieldValue: "" },
        { fieldName: "Model", fieldType: "text", fieldValue: "" },
        { fieldName: "Transmission Speed", fieldType: "text", fieldValue: "" },
        { fieldName: "Paper Capacity", fieldType: "text", fieldValue: "" },
      ]),
    },
    {
      typeId: 16,
      typeName: "Smart Board",
      categoryId: 1,
      desc: "Interactive whiteboards used for education and presentations, supporting touch and digital input.",
      activeStatus: 1,
      dynamicFields: JSON.stringify([
        { fieldName: "Screen Size", fieldType: "text", fieldValue: "" },
        { fieldName: "Connectivity", fieldType: "text", fieldValue: "" },
        {
          fieldName: "Interactive Features",
          fieldType: "text",
          fieldValue: "",
        },
      ]),
    },
  ];

  try {
    await Promise.all(types.map((type) => assetType.upsert({ ...type })));
    console.log(
      "Asset Types initialized successfully, including inactive types for 'Fixed-line Telecommunications'."
    );
  } catch (error) {
    console.log("Initialization failed:", error);
  }
}

module.exports = { initializeAssetType };
