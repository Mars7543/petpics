const bodyParser    = require('body-parser'),
      express       = require('express'),
      router        = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', (req, res) => {
   res.render('landing', {
       css: '/static/css/landing/app.css',
       js:  '/static/js/landing/app.js'
   });
});

router.get('/puppies', (req, res) => {
    res.render('puppies', {
        css: '/static/css/puppies/app.css',
        js:  '/static/js/puppies/app.js'
    });
});

router.post('/login', (req, res) => {
    res.redirect('/puppies');
});

router.post('/signup', (req, res) => {
    res.redirect('/');
});

module.exports = router;
