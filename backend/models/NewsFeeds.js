
module.exports = (sequelize, DataTypes) => {
  const newsfeeds = sequelize.define('newsfeeds', {
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
    type: {
      type: DataTypes.TEXT,
       allowNull: false, // Store JSON data as a string
    },
  });

  newsfeeds.associate = (models) => {
    
  newsfeeds.belongsTo(models.buildings); 
    newsfeeds.belongsTo(models.tenants);
  };

  return newsfeeds;
};

module.exports = (sequelize, DataTypes) => {
  const newsfeeds = sequelize.define('newsfeeds', {
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
    type: {
      type: DataTypes.TEXT,
       allowNull: false, // Store JSON data as a string
    },
  });

  newsfeeds.associate = (models) => {
    
  newsfeeds.belongsTo(models.buildings); 
    newsfeeds.belongsTo(models.tenants);
  };

  return newsfeeds;
};
