exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();

    req.flash('error', 'Please Login To Do That');
    res.redirect('/');
};
