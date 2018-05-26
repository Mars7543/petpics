 const  methodOverride  = require('method-override'),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        express         = require('express'),
        flash           = require('connect-flash'),
        app             = express();

// db config
// mongoose.connect(require('./config/database').host);
mongoose.connect(process.env.DB);

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
   console.log(`Server running on port ${PORT}...`);
});

// TODO: Add Side Bar With Search Filter Options, Groups, Friends, etc. and Post button
// TODO: Allow User Created Posts to Appear on View Page
// TODO: Make Search Bar Filter Posts by Desc, Tags, & user
// TODO: Allow Users to Edit / Delete & Like / Comment on Posts
