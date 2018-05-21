const express  = require('express'),
      router   = express.Router();

router.get('/', (req, res) => {
   res.render('landing', {css: '/static/css/landing/app.css'});
});

router.get('/puppies', (req, res) => {
    res.render('puppies', {css: '/static/css/puppies/app.css'});
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

module.exports = router;
