var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
    type: String,
    instruction: String,
    questions: [
        {
            text: String
        }
        ],
    wordsToOrder: [
        {
            text: String
        }
    ],
    table: [
        {
            text: String
        }
    ],
    line: [
        {
            before: String,
            after: String
        }
    ],
    abcd: [
        {
            ans: String
        }
    ]

});

module.exports = mongoose.model('Task', taskSchema);