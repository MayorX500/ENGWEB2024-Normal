// Node packages block
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");


// Routes block
var indexRouter = require('./routes/index');
var contratosRouter = require('./routes/contratos');


// MongoDB connection block
var dbName = process.env.DB_NAME || "contratos";  // Use an environment variable for the db name, with a default value
var dbPort = process.env.DB_PORT || "5000";  // Use an environment variable for the db port, with a default value
var mongoDB = `mongodb://127.0.0.1:${dbPort}/${dbName}`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });  // Added options to avoid deprecation warnings
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error while trying to connect to MongoDB..."));
db.once("open", () => {
  console.log("Connection to MongoDB was successful!");
});


// Express app block
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Route definition block
app.use('/', indexRouter);
app.use('/contratos', contratosRouter);

module.exports = app;
