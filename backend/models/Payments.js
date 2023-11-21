module.exports = (sequelize, DataTypes) => {
    const payments = sequelize.define("payments", {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cardinfo: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      cvv: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },    
      
    });   
    return payments;
  };