var express = require('express');
var router = express.Router();
const admincontroller = require('../controller/admin_user_controller');
// const multer = require('multer');
// const upload = multer();

/* GET home page. */

router.get('/read', admincontroller.SECURE,admincontroller.READ)
router.patch('/update/:id',admincontroller.SECURE ,admincontroller.UPDATE)
router.delete('/delete/:id',admincontroller.SECURE ,admincontroller.DELETE)

router.post('/register',admincontroller.SINGUP);
router.post('/login',admincontroller.LOGIN);


module.exports = router;