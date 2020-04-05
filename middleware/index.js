var User = require("../models/user");
var Sheet = require("../models/sheet");

var middlewareObj = {};

middlewareObj.redirectIfLogged = function(req, res, next){
    if(req.isAuthenticated()) {
        res.redirect("/sheets");
    }
    else{
        next();
    }
};


// middlewareObj.checkCommentOwner = function(req, res, next){
//
//     if(req.isAuthenticated()){
//         Comment.findById(req.params.comment_id, function(err, foundComment){
//             if(err || !foundComment           )
//             {
//                 req.flash("error", "Comment not found");
//                 res.redirect("back");
//             }
//             else{
//                 //check if the user is the author
//                 if(foundComment.author.id.equals(req.user._id)){
//                     next();
//                 }
//                 else{
//                     req.flash("error", "UYou don't have permission to do that");
//                     res.redirect("/campgrounds/" + req.params.id);
//                 }
//             }
//         });
//     }
//     else{
//         req.flash("error", "You need to bo logged in to do that");
//         res.redirect("/login");
//     }
//
// };
//
// middlewareObj.checkCampgroundOwnership = function(req, res, next){
//
//     if(req.isAuthenticated()){
//         Campground.findById(req.params.id, function(err, foundCampground){
//             if(err || !foundCampground)
//             {
//                 req.flash("error", "Campground not found");
//                 res.redirect("/campgrounds");
//             }
//             else{
//                 //check if the user is the author
//                 if(foundCampground.author.id.equals(req.user._id)){
//                     next();
//                 }
//                 else{
//                     req.flash("error", "You don't have permission to do that");
//                     res.redirect("/campgrounds");
//                 }
//             }
//         });
//     }
//     else{
//         req.flash("error", "You need to be logged in to do that");
//         res.redirect("/login");
//     }
// };
//
//
// middlewareObj.isLoggedIn = function(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.flash("error", "You need to be logged in to do that");
//     res.redirect("/login");
//
// };

module.exports = middlewareObj;