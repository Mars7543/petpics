const bodyParser    = require('body-parser'),
      express       = require('express'),
      router        = express.Router();

var images = [
    {
        img: '/static/img/hero.jpg',
        title: 'Petting My Cute Puppy',
        user: 'Mars7543',
        user_id: '6NB920D98EF',
        tags: ['puppy'],
        hearts: 4,
        visibility: 'public',
        comments: [
            {
                user: 'RandUser',
                user_id: '784A809D98EBD',
                comment: 'Wow I can\'t think of anything else to comment!',
                ago: '2 years ago'
            },
            {
                user: 'OtherPerson',
                user_id: '784A809D98EBD',
                comment: 'This is so adorable HAHAHA STOP POSTING HAHAH!',
                ago: '10 days ago'
            },
            {
                user: 'Rander',
                user_id: '784A809D98EBD',
                comment: 'I don\'t think I should be able to make two separate comments on the same page lol',
                ago: '12 minutes ago'
            }
        ]
    },
    {
        img: '/static/img/hero-2.jpg',
        title: 'My neighbor\'s cat and my dog get along well :) ',
        user: 'Pupla',
        user_id: '784A809D98EBD',
        tags: ['cat & dog'],
        hearts: 8,
        visibility: 'public',
        comments: [
            {
                user: 'RandUser',
                user_id: '784A809D98EBD',
                comment: 'Wow I can\'t think of anything else to comment!',
                ago: '2 years ago'
            },
            {
                user: 'OtherPerson',
                user_id: '784A809D98EBD',
                comment: 'This is so adorable HAHAHA STOP POSTING HAHAH!',
                ago: '10 days ago'
            },
            {
                user: 'Rander',
                user_id: '784A809D98EBD',
                comment: 'I don\'t think I should be able to make two separate comments on the same page lol',
                ago: '12 minutes ago'
            }
        ]
    },
    {
        img: '/static/img/hero-3.jpg',
        title: 'My Cat Must Be Allergic To Sunlight xD',
        user: 'TheMadCatter',
        user_id: '34A8D98EF',
        tags: ['cat', 'another tag'],
        hearts: 1,
        visibility: 'public',
        comments: [
            {
                user: 'RandUser',
                user_id: '784A809D98EBD',
                comment: 'Wow I can\'t think of anything else to comment!',
                ago: '2 years ago'
            },
            {
                user: 'OtherPerson',
                user_id: '784A809D98EBD',
                comment: 'This is so adorable HAHAHA STOP POSTING HAHAH!',
                ago: '10 days ago'
            },
            {
                user: 'Rander',
                user_id: '784A809D98EBD',
                comment: 'I don\'t think I should be able to make two separate comments on the same page lol',
                ago: '12 minutes ago'
            }
        ]
    },
    {
        img: '/static/img/hero.jpg',
        title: 'Petting My Cute Puppy',
        user: 'Mars7543',
        user_id: '6NB920D98EF',
        tags: ['puppy', 'Shi\'tzu'],
        hearts: 4,
        visibility: 'public',
        comments: [
            {
                user: 'RandUser',
                user_id: '784A809D98EBD',
                comment: 'Wow I can\'t think of anything else to comment!',
                ago: '2 years ago'
            },
            {
                user: 'OtherPerson',
                user_id: '784A809D98EBD',
                comment: 'This is so adorable HAHAHA STOP POSTING HAHAH!',
                ago: '10 days ago'
            },
            {
                user: 'Rander',
                user_id: '784A809D98EBD',
                comment: 'I don\'t think I should be able to make two separate comments on the same page lol',
                ago: '12 minutes ago'
            }
        ]
    },
    {
        img: '/static/img/hero-3.jpg',
        title: 'My Cat Must Be Allergic To Sunlight xD',
        user: 'TheMadCatter',
        user_id: '34A8D98EF',
        tags: ['cat'],
        hearts: 1,
        visibility: 'public',
        comments: [
            {
                user: 'RandUser',
                user_id: '784A809D98EBD',
                comment: 'Wow I can\'t think of anything else to comment!',
                ago: '2 years ago'
            },
            {
                user: 'OtherPerson',
                user_id: '784A809D98EBD',
                comment: 'This is so adorable HAHAHA STOP POSTING HAHAH!',
                ago: '10 days ago'
            },
            {
                user: 'Rander',
                user_id: '784A809D98EBD',
                comment: 'I don\'t think I should be able to make two separate comments on the same page lol',
                ago: '12 minutes ago'
            }
        ]
    },
    {
        img: '/static/img/hero-2.jpg',
        title: 'My neighbor\'s cat and my dog get along well :) ',
        desc: 'My neighbor\'s cat and my dog get along well :) ',
        user: 'Pupla',
        user_id: '784A809D98EBD',
        tags: ['cat & dog', 'cute cat'],
        hearts: 8,
        visibility: 'public',
        comments: [
            {
                user: 'RandUser',
                user_id: '784A809D98EBD',
                comment: 'Wow I can\'t think of anything else to comment!',
                ago: '7 days ago'
            },
            {
                user: 'OtherPerson',
                user_id: '784A809D98EBD',
                comment: 'This is so adorable HAHAHA STOP POSTING HAHAH!',
                ago: '25 minutes ago'
            },
            {
                user: 'Rander',
                user_id: '784A809D98EBD',
                comment: 'I don\'t think I should be able to make two separate comments on the same page lol',
                ago: 'Yesterday'
            }
        ]
    },
];

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', (req, res) => {
   res.render('landing', {
       css:      '/static/css/landing/app.css',
       queries:  '/static/css/landing/queries.css',
       nonav: true
   });
});

router.get('/puppies', (req, res) => {
    res.render('puppies', {
        css:     '/static/css/puppies/app.css',
        queries: '/static/css/puppies/queries.css',
        images
    });
});

router.post('/login', (req, res) => {
    res.redirect('/puppies');
});

router.post('/signup', (req, res) => {
    res.redirect('/');
});

module.exports = router;
