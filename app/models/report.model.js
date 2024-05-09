module.exports = (sequelize, Sequelize) => {
  const Report = sequelize.define(
    "report",
    {
      reportId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      typeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "assetType",
          key: "typeId",
        },
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      reportDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      dateFilter: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reportType: {
        type: Sequelize.ENUM("type", "assignment"),
        allowNull: false,
      },
      customReportName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      typeReportName: {
        type: Sequelize.VIRTUAL,
        get() {
          if (this.getDataValue("reportType") !== "type") {
            return null;
          }
          if (this.getDataValue("customReportName")) {
            return this.getDataValue("customReportName");
          }

          const typeId = this.get("typeId");
          const assetType = this.get("assetType");
          const typeName = assetType ? assetType.typeName : null;
          const startDate = this.formatDate(this.getDataValue("startDate"));
          const endDate = this.formatDate(this.getDataValue("endDate"));
          const dateFilter = this.getDataValue("dateFilter");
          let namePrefix = typeName ? `${typeName} Assets` : `All Assets`;

          if (dateFilter === "Acquisition Date") {
            namePrefix = typeId
              ? `Acquired ${namePrefix}`
              : `All Acquired Assets`;
          } else if (dateFilter === "Disposal Date") {
            namePrefix = typeId
              ? `Disposed ${namePrefix}`
              : `All Disposed Assets`;
          }

          let dates =
            startDate && endDate ? ` (${startDate} - ${endDate})` : "";
          return `${namePrefix}${dates}`;
        },
      },
      assignmentReportName: {
        type: Sequelize.VIRTUAL,
        get() {
          if (this.getDataValue("reportType") !== "assignment") {
            return null;
          }
          if (this.getDataValue("customReportName")) {
            return this.getDataValue("customReportName");
          }

          const typeId = this.get("typeId");
          const assetType = this.get("assetType");
          const typeName = assetType ? assetType.typeName : null;
          const dateFilter = this.getDataValue("dateFilter");
          const startDate = this.formatDate(this.getDataValue("startDate"));
          const endDate = this.formatDate(this.getDataValue("endDate"));

          let namePrefix = "Managed Assets";

          switch (dateFilter) {
            case "Checkout Date":
              namePrefix = "Checked Out Assets";
              break;
            case "Checkin Date":
              namePrefix = "Checked In Assets";
              break;
            case "Both":
              namePrefix = "Managed Assets";
              break;
          }

          if (typeName && typeName !== "All") {
            namePrefix = `${namePrefix}: ${typeName}`;
          } else {
            namePrefix = `All ${namePrefix}`;
          }

          let dates =
            startDate && endDate ? ` (${startDate} - ${endDate})` : "";
          return `${namePrefix}${dates}`;
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  // Helper method to format dates
  Report.prototype.formatDate = function (date) {
    if (!date) return null;
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(new Date(date));
  };

  return Report;
};
