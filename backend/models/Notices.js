module.exports = (sequelize, DataTypes) => {
    const notices = sequelize.define("notices", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: false,
        type: DataTypes.STRING(1000),
      },
      dateAndTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      
    });
   
  
    return notices;
  };