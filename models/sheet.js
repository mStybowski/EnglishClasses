var mongoose = require("mongoose");

var sheetSchema = new mongoose.Schema({
    title: String,
    description: String,
    shared: Boolean,
    tasks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Task"
            }
        ]
});

module.exports = mongoose.model('Sheet', sheetSchema);