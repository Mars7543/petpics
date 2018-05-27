var LocalStrategy = require("passport-local").Strategy;

// load up model
var User        = require("../models/user");

module.exports = function(passport){
    // ======================
    // passport session setup
    // ======================

    // used to serialize user for this session
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    // used to deserialize user
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
           done(err, user);
        });
    });

    // ============
    // LOCAL SIGNUP
    // ============

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',    // specify username and password fields
        passwordField: 'password',
        passReqToCallback: true    // pass entire request to callback
    },
    function(req, email, password, done){
        process.nextTick(function(){
            User.findOne({'local.email' : email}, function(err, user){
                if (err){
                    req.flash('error', 'Something went wrong w/ our servers :( Please try again later');
                    return done(err);
                } else {
                    if (user) {
                        req.flash('error', 'That email is already taken.');
                        return done(null, false);
                    } else {
                        // if there isnt' a user with that email or username check create user
                        User.findOne({'local.email' : email}, function(err, user){
                            if (user) {
                                req.flash('error', 'That username is already taken.');
                                return done(null, false);
                            }
                        });

                        var newUser = new User();

                        // set user's local credentials
                        newUser.local.email = email;
                        newUser.local.username = req.body.username;
                        newUser.local.password = newUser.generateHash(password);

                        // set user's mo name
                        newUser.firstName = req.body.firstName;
                        newUser.lastName = req.body.lastName;

                        // save user
                        newUser.save(function(err) {
                            if (err) {
                                req.flash('error', 'Something went wrong w/ our servers :( Please try again later');

                                return done(err);
                            }

                            req.flash("success", 'Welcome to PetPics, ' + newUser.firstName[0].toUpperCase() + newUser.firstName.slice(1) + "!");
                            return done(null, newUser);
                        });
                    }
                }
            });
        });
    }));

    // ============
    // LOCAL LOGIN
    // ============

    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, username, password, done){
        // find user with given email
        User.findOne({$or:[{'local.email': username},{'local.username': username}]}, function(err, user){
            if (err){
                req.flash('error', 'Something went wrong w/ our servers :( Please try again later');
                return done(err);
            }

            // if no user exists for given email try with username
            if (!user || !user.validPassword(password)){
                req.flash('error', 'Error: Invalid Login Credentials');
                return done(null, false);
            }

            // if no errors occurred then send back user
            req.flash('success', 'Welcome back, ' + user.firstName[0].toUpperCase() + user.firstName.slice(1) + "!");
            return done(null, user);
        });
    }));
};
