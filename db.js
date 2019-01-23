const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function success() {
        console.log('Connected to blue-badge-server postgres database');
    },
    function fail(err){
        console.log(err);
    }
);

module.exports = sequelize;