module.exports = (sequelize, DataTypes) => {
    const tenants = sequelize.define("tenants", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apartmentNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
      
    });
    tenants.associate = (models) => {
          tenants.belongsTo(models.users);
      };

    return tenants;
  };