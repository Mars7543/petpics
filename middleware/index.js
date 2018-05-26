const fs = require('fs');

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();

    req.flash('error', 'Please Login To Do That');
    res.redirect('/');
};

exports.mkdirpath = function(dir) {
    var filessystem = require('fs');

    if (!filessystem.existsSync(dir)){
        filessystem.mkdirSync(dir);
    }
};
