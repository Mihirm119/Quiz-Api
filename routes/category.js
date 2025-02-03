var express = require('express');
var router = express.Router();
const categorycontroller = require('../controller/categorycontroller')

/* GET users listing. */
router.post('/', categorycontroller.Create);


module.exports = router;