module.exports = (sequelize, DataTypes) => {
    const wishlists = sequelize.define("wishlists", {
      status: {
        type: DataTypes.BOOLEAN, // true for wishlisted
        allowNull: false,
      },
    });
    wishlists.associate = (models) => {
      wishlists.belongsTo(models.listings); 
      wishlists.belongsTo(models.users);// Add this line
    };
   
    return wishlists;
  };
  