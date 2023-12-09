const express = require('express');
const router = express.Router();
const { addWorkout, getWorkoutsByUser, deleteWorkout, deleteAll } = require('../models/workouts'); // Adjust the path to your model file

router.post('/add', async (req, res) => {
  try {
    const workout = req.body;
    // Ensure the Workout has necessary fields
    if (!workout.userId || !workout.name || !workout.duration || !workout.calories || !workout.date) {
      return res.status(400).send('Missing workout data');
    }
    const result = await addWorkout(workout);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET endpoint for retrieving workouts for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const workouts = await getWorkoutsByUser(userId);
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/deleteAll/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await deleteAll(userId);
    if (result.deletedCount === 0) {
      return res.status(404).send('workout not found');
    }
    res.send('workout deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE endpoint for deleting an workout
router.delete('/delete/workout/:workoutId', async (req, res) => {
  try {
    const workoutId = req.params.workoutId;
    const result = await deleteWorkout(workoutId);
    if (result.deletedCount === 0) {
      return res.status(404).send('workout not found');
    }
    res.send('workout deleted successfully');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
