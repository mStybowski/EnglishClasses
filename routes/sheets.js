var express = require("express");
var router = express.Router();
var Sheet = require("../models/sheet");
var Task = require("../models/Task");
var middlewareObj = require("../middleware/index");
var mongoose = require("mongoose");
var User = require("../models/user");

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


router.get("/addtasks", function(req, res) {

    User.findById(req.user._id).populate("tasks").exec( function(err, foundUser){
        if(err)
        {
            req.flash("error", "Couldnt find the user");
            res.redirect("/sheets");
        }
        else{
            res.render("tasks/addtosheet", {user: foundUser});
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

    User.findById(req.user._id, function(err, foundUser){

        if(err)
        {
            req.flash("error", "Couldn't find the user");
            res.redirect("/sheets");
        }
        else{
            Sheet.create(newSheet, function(err, newlyCreatedSheet){
                if(err) {
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                    res.redirect("/sheets");
                }
                else{
                    newlyCreatedSheet.author.id = req.user._id;
                    newlyCreatedSheet.author.username = req.user.username;
                    newlyCreatedSheet.save();
                    foundUser.sheets.push(newlyCreatedSheet);
                    foundUser.save();
                    res.redirect("/sheets/addtasks");
                }
        });

    }
});


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
router.get("/:id/edit", function(req, res){
    Sheet.findById(req.params.id, function(err, foundSheet){
        if(err || !foundSheet) {
            req.flash("error", "Arkusz nie został znaleziony");
            res.redirect("/sheets");
        }
        else{
            res.render("sheets/edit", {sheet: foundSheet});
        }
    });

});

router.put("/:id", (req, res) => {

    Sheet.findByIdAndUpdate(req.params.id, req.body.sheet, function(err, updatedSheet){
        if(err)
            res.redirect("/sheets");
        else{
            res.redirect("/sheets/" + req.params.id);
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
    User.findById(req.user._id, function(err, foundUser){

        if(err)
        {
            req.flash("error", "Couldnt find the user");
            res.redirect("/sheets");
        }

        else{
            Sheet.create(newSheet, function(err, newlyCreatedSheet){
                if(err) {
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                    res.redirect("/sheets");
                }
                else{
                    newlyCreatedSheet.author.id = req.user._id;
                    newlyCreatedSheet.author.username = req.user.username;
                    newlyCreatedSheet.save();
                    foundUser.sheets.push(newlyCreatedSheet);
                    foundUser.save();
                    req.flash("success", "Pomyślnie dodano nową kartę pracy");
                    res.redirect("/profile/" + req.user._id);
                }
            });

        }


});
});

module.exports = router;
