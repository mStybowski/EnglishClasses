var express = require("express");
var router = express.Router();
var Sheet = require("../models/sheet");
var Task = require("../models/Task");
var middlewareObj = require("../middleware/index");
var mongoose = require("mongoose");
var User = require("../models/user");

router.get("/", (req, res)=>{
    res.render("tasks/tasks");
});


router.get("/new", (req, res)=>{
    res.render("tasks/new");
});

router.get("/:id/edit", function(req, res){

    Task.findById(req.params.id, function(err, foundTask){
        if(err || !foundTask) {
            req.flash("error", "Zadanie nie istnieje");
            res.redirect("/sheets");
        }
        else{
            res.render("tasks/edit", {task: foundTask});
        }
    });


});

router.post("/addtosheet", function(req, res){
    res.render("tasks/addtosheet");
});

router.put("/:id", function(req, res){
    Task.findByIdAndUpdate(req.params.id, req.body.task, function(err, updatedTask){
        if(err) {
            req.flash("error", "Task couldn't have been updated!")

            res.redirect("/sheets");
        }
        else{
            req.flash("success", "Task updated!")
            res.redirect("/profile/" + req.user.id);
        }
    });
});
router.post("/draft", function(req, res){

    const newTask = new Task({
        img: req.body.img,
        description: req.body.description,
        points: req.body.points,
        type: req.body.type
    });

    User.findById(req.user._id, function(err, foundUser){

        if(err)
        {
            req.flash("error", "Couldnt find the user");
            res.redirect("/sheets");
        }

        else{
            Task.create(newTask, function(err, newlyCreatedTask){
                if(err) {
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                    res.redirect("/sheets");
                }
                else{

                    newlyCreatedTask.author.id = req.user._id;
                    newlyCreatedTask.author.username = req.user.username;
                    newlyCreatedTask.save();
                    foundUser.tasks.push(newlyCreatedTask);
                    foundUser.save();
                    req.flash("success", "Pomyślnie dodano nowe zadanie");
                    res.redirect("/profile/" + req.user._id);
                }
            });

        }
    });
});

module.exports = router;

// router.post("/", function(req, res) {
//     console.log(req.body.types);
//     console.log("==============");
//     const newTask = new Task({
//         type: req.body.types,
//         description: req.body.description,
//
//     });
//
//     switch(req.body.types) {
//         case '1':
//             newTask.wordsToOrder.push({text: req.body.przyklad1});
//             console.log(newTask);
//             break;
//         case '2':
//             console.log("Case 2");
//             break;
//
//         default:
//     }
//
//     User.findById(req.user._id, function(err, foundUser){
//
//         if(err)
//         {
//             req.flash("error", "Couldnt find the user");
//             res.redirect("/sheets");
//         }
//
//         else{
//             Task.create(newTask, function(err, newlyCreatedTask){
//                 if(err) {
//                     req.flash("error", "Something went wrong!");
//                     console.log(err);
//                     res.redirect("/sheets");
//                 }
//                 else{
//                     console.log("Already here!!!*-*********************");
//                     newlyCreatedTask.author.id = req.user._id;
//                     newlyCreatedTask.author.username = req.user.username;
//                     newlyCreatedTask.save();
//                     foundUser.tasks.push(newlyCreatedTask);
//                     foundUser.save();
//                     req.flash("success", "Pomyślnie dodano nowe zadanie");
//                     res.redirect("/profile/" + req.user._id);
//                 }
//             });
//
//         }
//     });
// });


