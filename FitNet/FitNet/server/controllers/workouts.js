const express = require('express');
const router = express.Router();
const { addExercise, getExercisesByUser, deleteExercise, deleteAll } = require('../models/workouts'); // Adjust the path to your model file

router.post('/add', async (req, res) => {
  try {
    const exercise = req.body;
    // Ensure the exercise has necessary fields
    if (!exercise.userId || !exercise.name || !exercise.duration || !exercise.calories || !exercise.date) {
      return res.status(400).send('Missing exercise data');
    }
    const result = await addExercise(exercise);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET endpoint for retrieving exercises for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const exercises = await getExercisesByUser(userId);
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/deleteAll/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await deleteAll(userId);
    if (result.deletedCount === 0) {
      return res.status(404).send('Exercise not found');
    }
    res.send('Exercise deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE endpoint for deleting an exercise
router.delete('/delete/exercise/:exerciseId', async (req, res) => {
  try {
    const exerciseId = req.params.exerciseId;
    const result = await deleteExercise(exerciseId);
    if (result.deletedCount === 0) {
      return res.status(404).send('Exercise not found');
    }
    res.send('Exercise deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
