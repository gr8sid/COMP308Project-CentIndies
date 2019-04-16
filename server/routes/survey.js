let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let passport = require('passport');

let surveyController = require('../controllers/survey');

function requireAuth(req, res, next) {
    // check if the user is logged in
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

/* GET Contact List page - READ Operation */
router.get('/',    surveyController.displaySurveyList);

/* GET Route for the Add page 
   this will display the Add page */
router.get('/add',    surveyController.displayAddPage);

/* POST Route for processing the Add page */
router.post('/add',    surveyController.processAddPage);

/* GET request - display the Edit page */
router.get('/edit/:id',    surveyController.displayEditPage);

/* POST request - Update the database with data from the Edit Page */
router.post('/edit/:id',    surveyController.processEditPage);

/* GET request to perform the delete action */
router.get('/delete/:id',    surveyController.performDelete);




module.exports = router;