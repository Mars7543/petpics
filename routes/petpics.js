const   formidable  = require('formidable'),
        middleware  = require('../middleware'),
        mongoose    = require('mongoose'),
        express     = require('express'),
        multer      = require('multer'),
        router      = express.Router(),
        upload      = multer({ storage: multer.memoryStorage() }),
        path        = require('path'),
        AWS         = require('aws-sdk'),
        fs          = require('fs');

const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

const s3Bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: 'petpics-posts'
});

// MAIN VIEW
router.get('/petpics', middleware.isLoggedIn, (req, res) => {
    console.log(process.env.AWS_ACCESS_KEY_ID);
    console.log(process.env.AWS_SECRET_ACCESS_KEY);

    Post.find({}).populate('user').populate('comments').exec((err, posts) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Something went wrong w/ our servers :( Please try again later');
            return res.redirect('/');
        }

        res.render('petpics/home', {
            css:     '/static/css/petpics/home.css',
            js:      '/static/js/petpics/home.js',
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
        js:      '/static/js/petpics/new.js',
        queries: '/static/css/petpics/new-queries.css',
        noAdd: true
    });
});

// CREATE
router.post('/petpics', middleware.isLoggedIn, (req, res) => {
    var post = {};

    var form = new formidable.IncomingForm();

    // middleware.mkdirpath('public/img/uploads/' + req.user.local.username);
    // form.uploadDir = path.join(__dirname, '../public/img/uploads/' + req.user.local.username);

    // parse the form
    form.parse(req, (err, fields, files) => {
        User.findById(req.user._id, (err, user) => {
            if (err) {
                console.log('Error Occured While Finding User: ' + err);
                req.flash('error', 'Something went wrong with our servers :( Please try again later');
                return res.redirect('/petpics');
            }

            var file = files.image;
            var filename = `${req.user.local.username}/${req.user.postName}.${file.name.split('.').pop()}`;

            post.tags   =   fields.tags.split(',');
            post.user    =   req.user._id;
            post.description =   fields.description;
            post.image = `https://s3.us-east-2.amazonaws.com/petpics-posts/${filename}`;

            fs.readFile(file.path, (err, data) => {
                if (err) {
                    console.log('Error Occured While Reading File: ' + err);
                    req.flash('error', 'An Error Occurred While Reading the File');
                    return res.redirect('/petpics');
                }

                var params = {
                    Key: filename,
                    Body: data,
                    Bucket: 'petpics-posts'
                };

                s3Bucket.upload(params, (err, data) => {
                    fs.unlink(file.path, (err) => {
                        if (err) {
                            console.log('Error Occured While Unlinking File: ' + err);
                            req.flash('error', 'An Error Occurred While Reading the File');
                            return res.redirect('/petpics');
                        }
                    });

                    if (err) {
                        console.log('Error Occured While Uploading File: ' + err);
                        req.flash('error', 'An Error Occurred While Uploading');
                        res.redirect('/petpics');
                    }
                });
            });

            user.postName++;
            user.save((err) => {
                if (err) {
                    console.log('Error Occured While Saving User: ' + err);
                    req.flash('error', 'Something went wrong with our servers :( Please try again later');
                    return res.redirect('/petpics');
                }
            });

            Post.create(post, (err, post) => {
                if (err) {
                    console.log(err);
                    req.flash('error', 'Something went wrong w/ our servers :( Please try again later');
                }
                else
                    req.flash('success', 'Successfully Uploaded!');

                setTimeout(() => { return res.redirect('/petpics'); }, 1000);
            });
        });
    });
});

// LIKE
router.post('/petpics/:id/:action', middleware.isLoggedIn, (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) console.log(err);

        else {
            User.findById(req.user._id, (err, user) => {
                if (err) console.log(err);

                else {
                    if (req.params.action === 'like') {

                        user.liked.push(req.params.id);
                        user.save((err) => {
                            if (err) console.log(err);

                            else {
                                post.liked_by.push(req.user._id);
                                post.likes++;

                                post.save((err) => {
                                    if (err) console.log(err);
                                });
                            }
                        });

                    } else {

                        user.liked.splice(user.liked.indexOf(req.params.id), 1);
                        user.save((err) => {
                            if (err) console.log(err);

                            else {
                                post.liked_by.splice(post.liked_by.indexOf(req.user._id), 1);
                                post.likes--;

                                post.save((err) => {
                                    if (err) console.log(err);
                                });
                            }
                        });
                    }
                }
            });
        }
    });
});

// COMMENT
router.post('/petpics/:id/comment', middleware.isLoggedIn, (req, res) => {

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
