module.exports = (sequelize, DataTypes) => {
    const managers = sequelize.define("managers", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
      
    });

    managers.associate = (models) => {
      managers.hasMany(models.notices, {
        onDelete: "cascade",
      });
      managers.hasMany(models.listings, {
        onDelete: "cascade",
      });
      managers.hasMany(models.buildings, {
        onDelete: "cascade",
      });
        managers.hasMany(models.tenants, {
          onDelete: "cascade",
        });
        managers.belongsTo(models.users);
      

    };
  
    return managers;
  };