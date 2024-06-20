module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
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
=======
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
    priority:{
      type: DataTypes.STRING,
      allowNull: false,
    }
    
  });
 

  return notices;
};
>>>>>>> mer/main
