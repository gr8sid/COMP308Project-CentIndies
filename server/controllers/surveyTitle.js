let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

// create a reference to the db schema
//let surveyModel = require('../models/survey');
let surveyModel = require('../models/surveyTitle');
//let answerModel = require('../models/answer');

let userModel = require("../models/user");
let User = userModel.User;

module.exports.displaySurveyList = (req, res, next) =>{
    surveyModel.find((err, surveyList) => {
        if(err) {
            return console.error(err);
        }
        else {
            res.json({success: true,msg:"surveys list displayed successfully!!", surveyList: surveyList, user: req.user});
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
   res.json({success: true, msg: 'Successfully Displayed Survey TITLE Add Page'});
}

module.exports.processAddPage = (req, res, next) => {

    let newSurvey = surveyModel({
        "surveyName": req.body.surveyName,
        "surveyAuthor": req.body.surveyAuthor,
        "questions": req.body.questions
    });

    surveyModel.create(newSurvey, (err, surveyModel) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.json({success: true, msg: 'Successfully Added New Survey Title'});
        }
    });
}


