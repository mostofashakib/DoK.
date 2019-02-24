var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User        = require("./models/user");
    
//requiring routes
var    indexRoutes      = require("./routes/index")
    
mongoose.connect('mongodb://heroku_qx1r8rt3:rq7q46l890rp1l0sou6ppunun6@ds211694.mlab.com:11694/heroku_qx1r8rt3');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "kurt is adib",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);

app.get('/index', function(req,res){
    res.render('index')
});

app.get('/index2', function(req,res){
    res.render('index2')
});

app.get('/index3', function(req,res){
    res.render('index3')
});

app.get('/dokview', function(req,res){
    res.render('dokview')
});

app.get('/register2', function(req,res){
    res.render('register2')
});

//handle sign up logic
app.post("/register2", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register2");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome " + user.username);
           res.redirect("/index3"); 
        });
    });
});

app.get('/business', function(req,res){
    res.render('business')
});

app.get('/gallery', function(req,res){
    res.render('gallery')
});

app.get('/sign', function(req,res){
    res.render('sign')
});

app.get('/policy', function(req,res){
    res.render('policy')
});

app.get('/list', function(req,res){
    res.render('list')
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The server is running!")
});