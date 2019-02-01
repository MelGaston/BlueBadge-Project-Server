module.exports = function (sequelize, DataTypes) {
    const Movie = sequelize.define('movie', {
        movie_id: {
            type:DataTypes.INTEGER,
            allowNull: false
        },
        owner_id: {
            type:DataTypes.INTEGER,
            allowNull: false
          },
        title: {
            type:DataTypes.STRING,
            allowNull:false
        },
        comment: {
            type:DataTypes.STRING
        }
    })

    return Movie;
}