var connect=require('../src/mongodb/connect');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/mongo', function(req, res, next) {
    res.send('u r testing mongodb');
});

module.exports = router;
