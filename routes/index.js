var express = require('express');
var router = express.Router();
var { app, crisis_count, last_crisis } = require('../app.js')
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		crisis_count: crisis_count,
		last_crisis: last_crisis
	});
});

module.exports = router;
