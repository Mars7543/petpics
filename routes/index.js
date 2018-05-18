const express  = require('express'),
      router   = express.Router();

router.get('/', (req, res) => {
   res.render('landing');
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.get('/puppies', (req, res) => {
    res.render('puppies');
});

module.exports = router;
