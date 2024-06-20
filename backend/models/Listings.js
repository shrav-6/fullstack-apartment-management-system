<<<<<<< HEAD
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
=======
const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize'); // Import your Sequelize instance
module.exports = (sequelize, DataTypes) => {
  const listings = sequelize.define('listings', {
    unitAvailable: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apartmentNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pets: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    startsFrom: {
      type: DataTypes.DATEONLY, // Assuming it's a date
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    extras: {
      type: DataTypes.TEXT, // Store JSON data as a string
    },
  });
 
  listings.associate = (models) => {
    listings.hasMany(models.tenants,
      {
        onDelete: "cascade",
      }
    );
    listings.hasMany(models.applications, {
      onDelete: 'cascade',
    });
    listings.belongsTo(models.buildings);
    listings.hasMany(models.wishlists, {
      onDelete: 'cascade',
    });
  };
 
  return listings;
};
>>>>>>> mer/main
