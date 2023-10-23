module.exports = (sequelize, DataTypes) => {
    const listings = sequelize.define("listings", {
      noOfBedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      moveInDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      moveOutDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      rentPerMonth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }); 

    listings.associate = (models) => {
        listings.hasMany(models.applications, {
            onDelete: "cascade",
        })
    };
    
    
  
    return listings;
  };