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
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return applications;
};

