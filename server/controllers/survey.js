let express = require('express');
let router = express.Router();
let jwt = require('jsonwebtoken');

// create a reference to the db schema
let surveyModel = require('../models/survey');
let surveyTitleModel = require('../models/surveyTitle');
let answerModel = require('../models/answer');

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



module.exports.displayMySurveyList = (req, res, next) =>{

   let username = req.params.username;

    surveyModel.find({ owner: { $in: username } }, (err, surveyList) => {
        if(err) {
            console.log("ERROR ----> "+ err.msg);
            return console.error(err);
        }
        else {
            console.log("Username ----> "+ username + "---" +surveyList);
           res.json({success: true, msg: 'My Survey List Displayed Successfully!!!', surveyList: surveyList, user: req.user});
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
   res.json({success: true, msg: 'Successfully Displayed PROJECT Add Page'});
}

module.exports.processAddPage = (req, res, next) => {

    let newSurvey = surveyModel({
        "surveyName": req.body.surveyName,
        "owner": req.body.owner,
        "question": req.body.question,
        "option1": req.body.option1,
        "option2": req.body.option2,
        "option3": req.body.option3,
        "option4": req.body.option4
    });

    surveyModel.create(newSurvey, (err, surveyModel) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.json({success: true, msg: 'Successfully Added New Survey'});
        }
    });
}




module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    surveyModel.findById(id, (err, surveyObject) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.json({success: true, msg: 'Successfully Displayed Survey to Edit', survey: surveyObject});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedSurvey = surveyModel({
        "_id": id,
        "surveyName": req.body.surveyName,
        "owner": req.body.owner,
        "question": req.body.question,
        "option1": req.body.option1,
        "option2": req.body.option2,
        "option3": req.body.option3,
        "option4": req.body.option4
    });

    surveyModel.update({_id: id}, updatedSurvey, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.json({success: true, msg: 'Successfully Edited Survey', survey: updatedSurvey});
        }
    })
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    surveyModel.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
           res.json({success: true, msg: 'Successfully Deleted Survey'});
        }
    });

    // Adding Survey Title 

    module.exports.displayAddSurveyTitle = (req, res, next) => {
        res.json({success: true, msg: 'Successfully Displayed Survey |Title Add Page'});
     }

    module.exports.addSurveyTitle = (req, res, next) => {

        let newSurveyTitle = surveyTitleModel({
            "surveyName": req.body.surveyName
        });
    
        surveyTitleModel.create(newSurveyTitle, (err, surveyTitleModel) => {
            if(err) {
                console.log(err);
                res.end(err);
            }
            else {
                res.json({success: true, msg: 'Successfully Added New Survey Title'});
            }
        });
    }




    // SAVING ANSWER

    module.exports.displayAnswerPage = (req, res, next) => {
        res.json({success: true, msg: 'Successfully Displayed Answer Add Page'});
     }

    module.exports.processAnswerPage = (req, res, next) => {

        let newAnswer = answerModel({
            "question": req.body.question,
            "answer": req.body.answer
        });
    
        answerModel.create(newAnswer, (err, answerModel) => {
            if(err) {
                console.log(err);
                res.end(err);
            }
            else {
                res.json({success: true, msg: 'Successfully Saved Answer to DB!'});
            }
        });
    }
}

