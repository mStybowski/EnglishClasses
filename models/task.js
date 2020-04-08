var mongoose = require("mongoose");

var taskSchema = new mongoose.Schema({
    type: String,
    instruction: String,
    description: String,
    points: String,
    img: String,
    url: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
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