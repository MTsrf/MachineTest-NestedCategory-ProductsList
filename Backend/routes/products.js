const express = require('express');
const { addProducts, getCount } = require('../Controller/product');
const router = express.Router();

router.post("/addProducts", addProducts)

router.get('/getCount', getCount)

module.exports = router