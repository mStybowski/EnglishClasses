var mongoose = require("mongoose");

var ABCtaskSchema = new mongoose.Schema({
    instruction: String,
    questions: [
        {
            text: String,
            answers: [
                {
                    answer: String
                }
            ]
        }
    ]

});

module.exports = mongoose.model('Task', ABCtaskSchema);