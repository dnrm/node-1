"use strict"

var mongoose = require('mongoose');
let app = require('./app');
let port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portfolio', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log('Server is running...')
        })
    })
    .catch(error => {
        console.log(error);
    })