let mongoose = require('mongoose');

// create a model class
let answerSchema = mongoose.Schema({
    question: String,
    answer: String
},
{
    collection: "answers"
});

module.exports = mongoose.model('sidharth2', answerSchema);