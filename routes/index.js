var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		crisis_count: global.crisis_count,
		last_crisis: global.last_crisis
	});
});

module.exports = router;
