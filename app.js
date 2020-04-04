var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    expressSanitizer = require("express-sanitizer"),
    User            = require("./models/user");

var methodOverride = require("method-override");
var flash = require("connect-flash");

var indexRoutes = require("./routes/index");
var sheetsRoutes = require("./routes/sheets");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(expressSanitizer());
app.use(methodOverride("_method"));

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

mongoose.connect('mongodb+srv://mstybowich:qazxsw123@firstdb-wo3n2.mongodb.net/EnglishClass?retryWrites=true', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("* * * Connected to Mongo DB!  * * *");
});

app.use("/", indexRoutes);
app.use("/sheets", sheetsRoutes);

app.listen(8080, infoFunct());

function infoFunct(){
    console.log(" \n* * * * * Server Running! * * * * *");
}
