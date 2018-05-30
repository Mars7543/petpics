const express   = require('express'),
      passport  = require('passport'),
      router    = express.Router();

// Landing Page
router.get('/', (req, res) => {
   res.render('landing');
});

// Register
router.post("/signup", passport.authenticate('local-signup', { // signup authentication route
    successRedirect: "/petpics",
    failureRedirect: "/",
}));

// Login
router.post("/login", passport.authenticate('local-login', {
    successRedirect : "/petpics",
    failureRedirect : "/",
    failureFlash    : true
}));

// Logout
router.get('/logout', (req, res) => {
    req.logout();

    req.flash('success', 'Logged Out!');
    res.redirect('/');
});

module.exports = router;
