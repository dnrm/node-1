"use strict"

require('dotenv').config();
var mongoose = require('mongoose');
const cors = require('cors');
let app = require('./app');
let port = 3700;

const mongodbUri = process.env.MONGO_URI;

app.use(cors())

mongoose.Promise = global.Promise;
mongoose.connect(mongodbUri, { useUnifiedTopology: true, useNewUrlParser: true })
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