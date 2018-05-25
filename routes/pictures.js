const   bodyParser  = require('body-parser'),
        express     = require('express'),
        router      = express.Router();

// NEW
router.get('/petpics/new', (req, res) => {

});

// CREATE
router.post('/petpics', (req, res) => {

});


// EDIT
router.get('/petpics/:id/edit', (req, res) => {

});

// UPDATE
router.put('/petpics/:id', (req, res) => {

});


// DELETE
router.delete('/petpics/:id', (req, res) => {

});

module.exports = router;
