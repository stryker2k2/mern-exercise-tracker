const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// If the route is "http://localhost/exercises/" then return MongoDB list of users
router.route('/').get((req, res) => 
{
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

// If the route is "http://localhost/exercises/add" then add a user to MongoDB list of users
router.route('/add').post((req, res) => 
{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);
    const completed = req.body.completed;

    const newExercise = new Exercise(
        {
            username, description, duration, date, completed,
        });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get Exercise by ID Route and Display
router.route('/:id').get((req, res) => 
{
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get Exercise by ID Route and Delete
router.route('/:id').delete((req, res) => 
{
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get Exercise by ID Route and Update
router.route('/update/:id').post((req, res) => 
{
    Exercise.findById(req.params.id)
        .then(exercise =>
        {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);
            exercise.completed = req.body.completed;

            exercise.save()
            .then(() => res.json('Exercise updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});





// Exports Router
module.exports = router;