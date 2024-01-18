const express = require("express");
const reportRoute = express.Router();
const {insertReport} = require('../controller/report-controller')

reportRoute.post('/report', insertReport);

module.exports = reportRoute;