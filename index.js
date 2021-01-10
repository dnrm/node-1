"use strict"

var mongoose = require('mongoose');
const cors = require('cors');
let app = require('./app');
let port = 3700;

app.use(cors())

mongoose.Promise = global.Promise;
mongoose.connect('', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log('Server is running...')
        })
    })
    .catch(error => {
        console.log(error);
    })

module.exports = app;