const db = require("../models");
const assetCategory = db.assetCategory;

async function initializeAssetCategory() {
  const categories = [
    {
      categoryId: 4,
      categoryName: "Admin",
      desc: "This category comprises of all assets that are handles by Oklahoma Christian University, and can also handle Admin specific assets ",
    },
    {
      categoryId: 1,
      categoryName: "Information Technology (IT)",
      desc: "This category is comprised of assets that are handled by the university's IT department",
    },
    {
      categoryId: 2,
      categoryName: "Support Central",
      desc: "This category is comprised of assets that are handled by Support Central",
    },
    {
      categoryId: 3,
      categoryName: "Maintenance",
      desc: "This category is comprised of assets that are handled by the university's maintenance department",
    },
    
  ];

  try {
    await Promise.all(
      categories.map((category) => assetCategory.upsert(category))
    );
    console.log("Asset Categories initialized successfully, including an 'Inactive' category for Fixed-line Telecommunications.");
  } catch (error) {
    console.log("Initialization failed:", error);
  }
}

module.exports = { initializeAssetCategory };
