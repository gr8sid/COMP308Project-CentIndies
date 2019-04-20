let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let passport = require('passport');

let surveyTitleController = require('../controllers/surveyTitle');

function requireAuth(req, res, next) {
    // check if the user is logged in
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET Contact List page - READ Operation */
router.get('/',    surveyTitleController.displaySurveyList);

router.get('/add',    surveyTitleController.displayAddPage);

router.post('/add',    surveyTitleController.processAddPage);


module.exports = router;