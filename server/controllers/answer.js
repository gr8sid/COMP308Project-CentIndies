let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

// create a reference to the db schema
let answerModel = require('../models/answer');
let surveyModel = require('../models/survey');

module.exports.displayAnswerList = (req, res, next) =>{
    answerModel.find((err, answerList) => {
        if(err) {
            return console.error(err);
        }
        else {
            res.json({success: true,msg:"answers list displayed successfully!!", answerList: answerList, user: req.user});
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
   res.json({success: true, msg: 'Successfully Displayed PROJECT Add Page'});
}

module.exports.processAddPage = (req, res, next) => {
    let ques_id = req.params.id;
    question: String;
    SurveyName: String;

    surveyModel.findById(ques_id, (err, surveyObject) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else
        {
                question = surveyObject.question;
                SurveyName = surveyObject.surveyName;
                console.log("QUESTION is: " + question);
        }
    });

    let newAnswer = answerModel({
        "surveyName": SurveyName,
        "question": question,
        "answer": req.body.answer  
    });

    answerModel.create(newAnswer, (err, answerModel) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.json({success: true, msg: 'Successfully Added New Answer'});
        }
    });
}


