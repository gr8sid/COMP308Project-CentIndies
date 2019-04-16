let mongoose = require('mongoose');

// create a model class
let surveySchema = mongoose.Schema({
    surveyName: String,
    owner: String,
    question: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
},
{
    collection: "surveys"
});

module.exports = mongoose.model('sidharth', surveySchema);