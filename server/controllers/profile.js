let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
let passport = require("passport");
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// define the User Model
let userModel = require("../models/user");
let User = userModel.User; // alias

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate('local', 
  (err, user, info) => {
    // server error?
    if(err) {
      return next(err);
    }
    // is there a user login error?
    if(!user) {
      return res.json({success: false, msg: 'ERROR: Failed to Log In User.'});
    }
    req.logIn(user, 
      (err) => {
      // server error?
      if(err) {
        return next(err);
      }
      const payload = {
        id: user._id,
        displayName: user.displayName,
        username: user.username,
        email: user.email
      }

      const authToken = jwt.sign(payload, DB.secret, {
          expiresIn: 604800 // 1 week
      });

      return res.json({success: true, msg: 'User Logged in successfully ->' + user._id, user: {
        id: user._id,
        displayName: user.displayName,
        username: user.username,
        email: user.email
      }, token: authToken});
    });
  })(req, res, next);
}


module.exports.processRegisterPage = (req, res, next) => {
  // define a new user object
  let newUser = new User({
    
    username: req.body.username,
    //password: req.body.password
    email: req.body.email,
    displayName: req.body.displayName
  });
 
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log("Error: Inserting New User");
      if (err.name == "UserExistsError") {
        console.log("Error: User Already Exists!");
      }
      return res.json({success: false,  msg: 'ERROR: Failed to Register User.'});
    } else {
      return res.json({success: true, msg: 'User Registered Successfully!'});
    }
  });
};

module.exports.performLogout = (req, res, next) => {
  req.logout();
  res.json({success: true, msg: 'User Successfully Logged Out'});
};

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
  
  let id = req.user.id;
  console.log("USER ID Found ->>>>"+id);

  User.findById(id, (err, userList) => {
        if(err) {
            console.log("ERROR ----> "+ err.msg);
            return console.error(err);
        }
        else {
          console.log("USER ID Found ->>>>"+id);
            console.log("Username ----> "+ "---" +userList);
           res.json({success: true, msg: 'My Survey List Displayed Successfully!!!', userList: userList, user: req.user});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
  let id = req.params.id;

  let username = req.body.username;

  let updatedProfile = new User({
      "id": id,
      "username": req.body.username,
      //password: req.body.password
      "email": req.body.email,
      "displayName": req.body.displayName
    });

    User.updateMany({id: id}, updatedProfile, (err) => {
        console.log("My ID--->" + req.body);
      if(err) {
          console.log(err);
          res.end(err);
      }
      else {
          res.json({success: true, msg: 'Successfully Edited Profile', user: updatedProfile});
      }
  });
}
