var express = require("express");
var router = express.Router();
var Sheet = require("../models/sheet");
var abcTask = require("../models/abcTask");
var middlewareObj = require("../middleware/index");
var mongoose = require("mongoose");

router.get("/", (req, res)=>{

    Sheet.find({}, function(err, found){
            if(err){
                console.log(err);
                res.redirect("/");
            }
            else{
                res.render("sheets/sheets", {sheets: found});
            }
    });


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
//     Sheet.findOne(req.params.id,function(err, foundSheet){
//         if(err)
//         {
//             req.flash("error", "Nie znaleziono takiego arkusza");
//             res.redirect("/sheets");
//         }
//         else {
//             res.render("sheets/show", {sheet: foundSheet});
//         }
//     });
});

router.post("/", function(req, res){
    //lookup campground using ID
    const newSheet = new Sheet({
        title: req.body.title,
        tasks: []
    });

    const newTask = new abcTask({
        _id: new mongoose.Types.ObjectId(),
        instruction: req.body.instruction,
        questions:[
            {
                text: req.body.text1,
                answers:[
                    {
                        answer: req.body.answerA1
                    },
                    {
                        answer: req.body.answerB1
                    },
                    {
                        answer: req.body.answerC1
                    }
                ]
            },
            {
                text: req.body.text2,
                answers:[
                    {
                        answer: req.body.answerA2
                    },
                    {
                        answer: req.body.answerB2
                    },
                    {
                        answer: req.body.answerC2
                    }
                ]
            },
        ]
    });

    Sheet.create(newSheet, function(err, newlyCreatedSheet){
        if(err){
            console.log(err);
            res.redirect("/help");
        } else {
            abcTask.create(newTask, function(err, newlyCreatedTask){
                if(err){
                    console.log(err);
                    res.redirect("/help");
                } else {
                    newlyCreatedSheet.tasks.push(newlyCreatedTask);
                    newlyCreatedSheet.save();
                    res.redirect("/sheets");
                }
            });
        }
    });
});


module.exports = router;