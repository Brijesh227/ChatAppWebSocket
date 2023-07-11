const express = require('express');
const messageRoute = require('./messageRoute/messageroute')
const router = express.Router();

router.use("/message", messageRoute);

module.exports = { router };