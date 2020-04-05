var express = require("express");
var middlewareObj = require("../middleware/index");
var passport = require("passport");
var User = require("../models/user");

var router = express.Router();

router.get("/", middlewareObj.redirectIfLogged, (req, res)=>{
    //tutaj middleware, jeśli zalogowano to przekierować do /sheets
    res.render("index");
});

router.get("/login",(req, res)=>{
    res.render("login");
});

// router.post("/login", passport.authenticate("local",
//     {
//         successRedirect: {
//             "/sheets"
//         },
//         failureRedirect: "/login"
//     }),function(req, res){
//     req.flash("success", "Zalogowano?");
// });

router.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }), (req, res) => {
        req.flash("success", "Zalogowano");
        res.redirect("/sheets");
    });

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username, type: "student"});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/sheets");
        });
    });
});

router.get("/register",(req, res)=>{
    res.render("register");
});

router.get("/help",(req, res)=>{
    res.render("help");
});


router.get("/logout",(req, res)=>{
    req.logout();
    req.flash("success", "Wylogowano");
    res.redirect("/");
});



module.exports = router;