module.exports = (sequelize, DataTypes) => {
<<<<<<< HEAD
    const users = sequelize.define("users", {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    users.associate = (models) => {
      users.hasOne(models.managers);
      users.hasOne(models.tenants);
      
    };
  
    return users;
  };
=======
  const users = sequelize.define("users", {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  users.associate = (models) => {
    users.hasOne(models.managers);
    users.hasOne(models.tenants);
    users.hasOne(models.guests);
    users.hasMany(models.applications, {
      onDelete: 'cascade',
    });
    users.hasMany(models.wishlists, {
      onDelete: 'cascade',
    });
    
  };

  return users;
};
>>>>>>> mer/main
