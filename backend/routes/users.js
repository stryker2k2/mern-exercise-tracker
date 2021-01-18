const router = require('express').Router();
let User = require('../models/user.model');

// If the route is "http://localhost/users/" then return MongoDB list of users
router.route('/').get((req, res) => 
{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// If the route is "http://localhost/users/add" then add a user to MongoDB list of users
router.route('/add').post((req, res) => 
{
    const username = req.body.username;
    const password = req.body.password;
    const admin = req.body.admin;

    const newUser = new User(
        {
            username, password, admin,
        });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Exports Router
module.exports = router;