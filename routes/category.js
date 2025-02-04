var express = require('express');
var router = express.Router();
const categorycontroller = require('../controller/categorycontroller')

/* GET users listing. */
router.get('/', categorycontroller.Read);
router.post('/', categorycontroller.Create);
router.patch('/:id', categorycontroller.Update);
router.delete('/:id', categorycontroller.Delete);

module.exports = router;
