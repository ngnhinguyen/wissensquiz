const mongoose = require('mongoose');
const { options } = require('../../frontend/src/app/shared/routes');

const questionSchema = new mongoose.Schema({
    questions:String,
    options: [String],
    correctAnswer: String,
    explanation: String,
});

module.exports = mongoose.model('Question', questionSchema);