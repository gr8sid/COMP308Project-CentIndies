let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let passport = require('passport');

let profileController = require('../controllers/profile');

function requireAuth(req, res, next) {
    // check if the user is logged in
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

// /* GET Contact List page - READ Operation */
// router.get('/', passport.authenticate('jwt', {session: false}),  profileController.displayprofileList);

// /* GET Route for the Add page 
//    this will display the Add page */
// router.get('/add', passport.authenticate('jwt', {session: false}),  profileController.displayAddPage);

// /* POST Route for processing the Add page */
// router.post('/add', passport.authenticate('jwt', {session: false}),  profileController.processAddPage);

// /* GET request - display the Edit page */
// router.get('/edit/:id', passport.authenticate('jwt', {session: false}),  profileController.displayEditPage);

// /* POST request - Update the database with data from the Edit Page */
// router.post('/edit/:id', passport.authenticate('jwt', {session: false}),  profileController.processEditPage);

// /* GET request to perform the delete action */
// router.get('/delete/:id', passport.authenticate('jwt', {session: false}),  profileController.performDelete);



/* GET Contact List page - READ Operation */
router.get('/',   profileController.displayProfileList);


/* GET request - display the Edit page */
router.get('/edit/:id',    profileController.displayEditPage);

/* POST request - Update the database with data from the Edit Page */
router.post('/edit/:id',    profileController.processEditPage);





module.exports = router;