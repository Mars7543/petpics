const express  = require('express'),
      router   = express.Router();

router.get('/', (req, res) => {
   res.render('landing');
});

router.get('/puppies', (req, res) => {
    res.render('puppies');
});

module.exports = router;
