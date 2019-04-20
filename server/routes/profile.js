let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

let passport = require('passport');

let profileController = require('../controllers/profile');



/* GET Contact List page - READ Operation */
router.get('/',   profileController.displayProfileList);


/* GET request - display the Edit page */
router.get('/edit/:id',    profileController.displayEditPage);

/* POST request - Update the database with data from the Edit Page */
router.post('/edit/:id',    profileController.processEditPage);





module.exports = router;