var express = require("express");
var router = express.Router();
var Sheet = require("../models/sheet");
var Task = require("../models/Task");
var middlewareObj = require("../middleware/index");
var mongoose = require("mongoose");

router.get("/", (req, res)=>{

if(req.user.type === "student") {
    Sheet.find({shared: true}, function (err, found) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("sheets/sheets", {sheets: found});
        }
    });
}
else{
    Sheet.find({}, function (err, found) {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            res.render("sheets/sheets", {sheets: found});
        }
    });
}

});

router.get("/new", (req, res)=>{
    res.render("sheets/new");
});

router.get("/:id", function(req, res){
    Sheet.findById(req.params.id).populate("tasks"). exec(function(err, foundSheet){
        if(err){
            req.flash("error", "Nie znaleziono takiego arkusza");
            res.redirect("/sheets");
        }
        else{
            res.render("sheets/show", {sheet: foundSheet});
        }
    });

});


router.post("/addtasks", function(req, res) {

    const newSheet = new Sheet({
        title: req.body.title,
        description: req.body.description,
        shared: false,
        tasks: []
    });

    Sheet.create(newSheet, function(err, newlyCreatedSheet){
        if(err){
            console.log(err);
            res.redirect("/help");
        }
        else {
            res.redirect("/sheets/" + newlyCreatedSheet._id + "/edit");
        }
    });

});

router.post("/draft", function(req, res) {
    const newSheet = new Sheet({
        title: req.body.title,
        description: req.body.description,
        shared: false,
        tasks: []
    });
    Sheet.create(newSheet, function(err, newlyCreatedSheet){
        if(err){
            console.log(err);
            res.redirect("/help");
        }
        else {

            res.redirect("/sheets");
        }
    });

});

module.exports = router;

// const newTask = new Task({
//     _id: new mongoose.Types.ObjectId(),
//     instruction: req.body.instruction,
//     questions:[
//         {
//             text: req.body.text1,
//             answers:[
//                 {
//                     answer: req.body.answerA1
//                 },
//                 {
//                     answer: req.body.answerB1
//                 },
//                 {
//                     answer: req.body.answerC1
//                 }
//             ]
//         },
//         {
//             text: req.body.text2,
//             answers:[
//                 {
//                     answer: req.body.answerA2
//                 },
//                 {
//                     answer: req.body.answerB2
//                 },
//                 {
//                     answer: req.body.answerC2
//                 }
//             ]
//         },
//     ]
// });