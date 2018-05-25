const   formidable  = require('formidable'),
        middleWare  = require('../middleware'),
        express     = require('express'),
        router      = express.Router(),
        path        = require('path'),
        fs          = require('fs');

// MAIN VIEW
router.get('/petpics', middleWare.isLoggedIn, (req, res) => {
    res.render('petpics/home', {
        css:     '/static/css/petpics/home.css',
        queries: '/static/css/petpics/home-queries.css',
        images: require('./static_img_data')
    });
});

// NEW
router.get('/petpics/new', middleWare.isLoggedIn, (req, res) => {
    res.render('petpics/new', {
        css:     '/static/css/petpics/new.css',
        queries: '/static/css/petpics/new-queries.css',
        noAdd: true
    });
});

// CREATE
router.post('/petpics', middleWare.isLoggedIn, (req, res) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../public/img/uploads');

    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function(err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.redirect('/petpics');
    });

    // parse the incoming request containing the form data
    form.parse(req);
});


// EDIT
router.get('/petpics/:id/edit', middleWare.isLoggedIn, (req, res) => {

});

// UPDATE
router.put('/petpics/:id', middleWare.isLoggedIn, (req, res) => {

});


// DELETE
router.delete('/petpics/:id', middleWare.isLoggedIn, (req, res) => {

});

module.exports = router;
