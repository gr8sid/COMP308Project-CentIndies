let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let passport = require('passport');

let answerController = require('../controllers/answer');

function requireAuth(req, res, next) {
    // check if the user is logged in
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET Contact List page - READ Operation */
router.get('/',    answerController.displayAnswerList);

/* GET Route for the Add page 
   this will display the Add page */
router.get('/add',    answerController.displayAddPage);

/* POST Route for processing the Add page */
router.post('/add/:id',    answerController.processAddPage);
module.exports = router;