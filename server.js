 const  methodOverride  = require('method-override'),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        express         = require('express'),
        flash           = require('connect-flash'),
        app             = express();

// db config;
mongoose.connect(process.env.DB || require('./config/database').host);

// app config
app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// passport config
require("./config/passport")(passport); // pass passport for config function

app.use(require('express-session')({
    secret: 'God > Leo > All',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// local variables
app.use((req, res, next) => {
    res.locals.user     = req.user;
    res.locals.success  = req.flash('success');
    res.locals.error    = req.flash('error');

    next();
});

// route config
const indexRoutes = require('./routes');
const pictureRoutes = require('./routes/petpics');

app.use(indexRoutes);
app.use(pictureRoutes);

// server config
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(process.env.AWS_ACCESS_KEY_ID);
    console.log(process.env.AWS_SECRET_ACCESS_KEY);
    console.log(`Server running on port ${PORT}...`);
});

// TODO: Finish New Page
// TODO: Make Navbar Burger For Mobile Devices
// TODO: Make View Page Show All Info When User Click on a Post
// TODO: Make A Navbar Tab to Show Activity (Maybe a Bell Icon) on User's Posts (Likes Comments Follows etc.)
// TODO: Make Search Bar to Filter Posts by Desc, Tags, & User
