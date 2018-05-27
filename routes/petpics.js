const   formidable  = require('formidable'),
        middleware  = require('../middleware'),
        mongoose    = require('mongoose'),
        express     = require('express'),
        multer      = require('multer'),
        router      = express.Router(),
        upload      = multer({ storage: multer.memoryStorage() }),
        path        = require('path'),
        fs          = require('fs');

const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

// MAIN VIEW
router.get('/petpics', middleware.isLoggedIn, (req, res) => {
    Post.find({}).populate('user').populate('comments').exec((err, posts) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong w/ our servers :( Please try again later');
            return res.redirect('/');
        }

        res.render('petpics/home', {
            css:     '/static/css/petpics/home.css',
            queries: '/static/css/petpics/home-queries.css',
            posts
            // images: require('./static_post_data')
        });
    });
});

// NEW
router.get('/petpics/new', middleware.isLoggedIn, (req, res) => {
    res.render('petpics/new', {
        css:     '/static/css/petpics/new.css',
        queries: '/static/css/petpics/new-queries.css',
        noAdd: true
    });
});

// CREATE
router.post('/petpics', middleware.isLoggedIn, (req, res) => {
    var post = {};

    var form = new formidable.IncomingForm();

    middleware.mkdirpath('public/img/uploads/' + req.user.local.username);
    form.uploadDir = path.join(__dirname, '../public/img/uploads/' + req.user.local.username);

    // parse the form
    form.parse(req, (err, fields, file) => {
        var filename = req.user.postName + "." + file.image.name.split('.').pop();

        post.tags   =   fields.tags.split(',');
        post.user    =   fields.user_id;
        post.description =   fields.description;
        post.image = `/static/img/uploads/${req.user.local.username}/${filename}`;

        User.findById(req.user._id, (err, user) => {
            if (err) {
                req.flash('error', 'Something went wrong with our servers :( Please try again later');
                return res.redirect('/petpics');
            }

            fs.rename(file.image.path, path.join(form.uploadDir, filename));

            user.postName++;
            user.save((err) => {
                if (err) {
                    req.flash('error', 'Something went wrong with our servers :( Please try again later');
                    return res.redirect('/petpics');
                }
            });
        });
    });

    // log any errors that occur
    form.on('error', function(err) {
        req.flash('error', 'An Error Occurred While Uploading');
        return res.redirect('/petpics');
    });

    // once the file has been uploaded, send a response to the client
    form.on('end', function() {
        Post.create(post, (err, post) => {
            if (err)
                req.flash('error', 'Something went wrong w/ our servers :( Please try again later');
            else
                req.flash('success', 'Successfully Uploaded!');

            return res.redirect('/petpics');
        });
    });
});


// EDIT
router.get('/petpics/:id/edit', middleware.isLoggedIn, (req, res) => {

});

// UPDATE
router.put('/petpics/:id', middleware.isLoggedIn, (req, res) => {

});


// DELETE
router.delete('/petpics/:id', middleware.isLoggedIn, (req, res) => {

});

module.exports = router;
