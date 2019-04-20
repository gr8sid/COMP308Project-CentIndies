let mongoose = require('mongoose');

// create a model class
let surveyTitleSchema = mongoose.Schema({
  surveyName: {
    type: String,
    default: "",
    trim: true,
    required: "Title is required"
  },
  surveyAuthor: String,
  questions: [{ 
    _id: String,
  owner: String,
  question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String
  }]
},
{
    collection: "surveyTitles"
});

module.exports = mongoose.model('surveyTitle', surveyTitleSchema);