<<<<<<< HEAD
//const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const applications = sequelize.define("applications", {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return applications;
};
=======
module.exports = (sequelize, DataTypes) => {
    const applications = sequelize.define("applications", {
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        moveInDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        needParking: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        additionalInfo: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: '',
        },
    });

    
    return applications;
};


>>>>>>> mer/main
