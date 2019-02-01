module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('user', {
        firstName: {
            type:DataTypes.STRING,
            allowNull:false,
        },
        lastName: {
            type:DataTypes.STRING,
            allowNull:false,
        },
        email: {
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        passwordHash: {
            type:DataTypes.STRING,
            allowNull:false
        }
    })

    return User;
}