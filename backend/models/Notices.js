module.exports = (sequelize, DataTypes) => {
  const notices = sequelize.define("notices", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateAndTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    
  });
 

  return notices;
};