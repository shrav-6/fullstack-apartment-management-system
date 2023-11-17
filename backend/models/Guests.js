module.exports = (sequelize, DataTypes) => {
  const guests = sequelize.define("guests", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
    
  });
  
  guests.associate = (models) => {
      guests.belongsTo(models.users);  
  };
   

  return guests;
};
