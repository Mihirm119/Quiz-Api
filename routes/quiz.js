var express = require('express');
var router = express.Router();
const quizcontroller = require('../controller/quizcontroller')


/* GET users listing. */

router.post('/create',quizcontroller.CREATE);
router.post('/addquestion/:id',quizcontroller.Addquestion);

router.get('/read',quizcontroller.READ);

router.delete('/deletequestion/:id',quizcontroller.DELETEQUESTION);
router.delete('/deletequiz/:id',quizcontroller.DELETEQUIZ);

router.patch('/updatequiz/:id', quizcontroller.UPDATEQUIZ);

router.get('/playquiz/:id', quizcontroller.PLAYQUIZ)

router.post('/sumbitquiz/:id', quizcontroller.SUBMITQUIZ)


module.exports = router;