require('dotenv').config();
var express = require('express');
var app = express();
var sequelize = require('./db');

app.use(require('body-parser').json());
app.use(require('./middleware/headers'));

sequelize.sync();

var user = require('./controllers/user-controller');
var movie = require('./controllers/movie-controller');

app.use('/api/user', user);

app.use(require('./middleware/validate-session'));

app.use('/api/movie', movie);

app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT}`)
});