const express = require("express");
const router = express.Router();
const {
  addWorkout,
  getWorkoutsByUser,
  deleteWorkout,
  deleteAll,
  getAll,
} = require("../models/workouts");

router
  .post("/add", (req, res, next) => {
    const workout = req.body;
    if (
      !workout.userId ||
      !workout.name ||
      !workout.duration ||
      !workout.calories ||
      !workout.date
    ) {
      return res.status(400).send("Missing workout data");
    }
    addWorkout(workout)
      .then((result) => {
        res.status(201).send(result);
      })
      .catch(next);
  })
  .get("/", (req, res, next) => {
    getAll()
      .then((workouts) => {
        res.send(workouts);
      })
      .catch(next);
  })
  .get("/user/:userId", (req, res, next) => {
    const userId = req.params.userId;
    getWorkoutsByUser(userId)
      .then((workouts) => {
        res.send(workouts);
      })
      .catch(next);
  })
  .delete("/deleteAll/user/:userId", (req, res, next) => {
    const userId = req.params.userId;
    deleteAll(userId)
    .then((result) => {
      res.send(result);
    })
    .catch(next);
  })

  .delete("/delete/workout/:workoutId", (req, res, next) => {
    const { workoutId } = req.params;
    deleteWorkout(workoutId)
      .then((result) => {
        res.send(result);
      })
      .catch(next);
  });

module.exports = router;
