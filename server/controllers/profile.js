let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

// create a reference to the db schema
let userModel = require('../models/user');
let User = userModel.User; // alias


module.exports.displayProfileList = (req, res, next) =>{
    User.find((err, profileList) => {
        if(err) {
            return console.error(err);
        }
        else {
            res.json({success: true,msg:"Profile list displayed successfully!!", profileList: profileList, user: req.user});
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.username;

    User.findById(id, (err, profileObject) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else
        {
            console.log(profileObject);
            res.json({success: true, msg: 'Successfully Displayed Profile to Edit', profile: profileObject});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let userName = req.params.username;

    let updatedProfile = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
        displayName: req.body.displayName
      });

      User.update({username: userName}, updatedProfile, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.json({success: true, msg: 'Successfully Edited Profile', profile: updatedProfile});
        }
    })
}

