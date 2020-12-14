var express = require('express');
var router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { title: 'Tiffany\'s page' });
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Tiffany\'s project!');
            res.redirect('/about');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/signin', (req, res) => {
    res.render('signin');
})

router.post('/signin', passport.authenticate('local', { failureFlash: true, failureRedirect: '/signin' }), (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/feature';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
    
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/');
})

module.exports = router;
