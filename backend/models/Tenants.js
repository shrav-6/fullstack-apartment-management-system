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
<<<<<<< HEAD
        
=======
          tenants.hasMany(models.newsfeeds, {
            onDelete: 'cascade',
});
          tenants.hasMany(models.payments,
            {
              onDelete: "cascade",
            }
          );
>>>>>>> mer/main
      };

    return tenants;
  };