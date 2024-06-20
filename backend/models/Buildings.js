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
<<<<<<< HEAD
        buildings.hasMany(models.tenants,
          {
            onDelete: "cascade",
          }
          );
=======
        buildings.hasMany(models.tenants, {
          onDelete: "cascade",
        });
        
>>>>>>> mer/main
        buildings.hasMany(models.notices, {
          onDelete: "cascade",
        });
        buildings.hasMany(models.listings, {
          onDelete: "cascade",
<<<<<<< HEAD
        })
=======
        });
        buildings.hasMany(models.newsfeeds, {
          onDelete: "cascade",
        });

>>>>>>> mer/main
    };
  
    return buildings;
  };