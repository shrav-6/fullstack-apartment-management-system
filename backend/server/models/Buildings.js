module.exports = (sequelize, DataTypes) => {
    const buildings = sequelize.define("buildings", {
      buildingName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
});

        buildings.associate = (models) => {
        buildings.hasMany(models.tenants,
          {
            onDelete: "cascade",
          }
          );
        buildings.hasMany(models.notices, {
          onDelete: "cascade",
        },
        );
        buildings.hasMany(models.listings, {
          onDelete: "cascade",
        });
    };
  
    return buildings;
  };