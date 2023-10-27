module.exports = (sequelize, DataTypes) => {
    const notices = sequelize.define("notices", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateAndTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      
    });
   
  
    return notices;
  };