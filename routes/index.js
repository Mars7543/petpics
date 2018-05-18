const express  = require('express'),
      router   = express.Router();

router.get('/', (req, res) => {
   res.render('landing', {css: 'landing.css'});
});

router.get('/puppies', (req, res) => {
    res.render('puppies');
});

module.exports = router;
