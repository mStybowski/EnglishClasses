var express = require("express");
var router = express.Router();
var Sheet = require("../models/sheet");
var Task = require("../models/Task");
var middlewareObj = require("../middleware/index");
var mongoose = require("mongoose");

router.get("/new", (req, res)=>{
    res.render("/tasks/new");
});

router.post("/:id", function(req, res){

});

router.post("/:id/edit", function(req, res){

    res.render("/tasks/edit");
});

router.post("/addtasks", function(req, res) {


});

module.exports = router;
