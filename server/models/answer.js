let mongoose = require('mongoose');

// create a model class
let answerSchema = mongoose.Schema({
    surveyName: String,
    question: String,
    answer: String
},
// { 
//     versionKey: false 
// },
{
    collection: "answers"
});

module.exports = mongoose.model('sidharth2', answerSchema);