let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let passport = require('passport');

let answerController = require('../controllers/answer');


/* GET Contact List page - READ Operation */
router.get('/',    answerController.displayAnswerList);
router.get('/answer-list',    answerController.displayAnswerList);

/* GET Route for the Add page 
   this will display the Add page */
router.get('/add',    answerController.displayAddPage);

/* POST Route for processing the Add page */
router.post('/add/:id',    answerController.processAddPage);
module.exports = router;