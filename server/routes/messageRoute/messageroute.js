const express = require('express');
const { fetchMessage } = require('../../controllers')
const router = express.Router();

router.get("/",fetchMessage)

module.exports = router;