const express = require("express");
const router = express.Router();
const {
  addWorkout,
  getWorkoutsByUser,
  deleteWorkout,
  deleteAll,
  getAll,
  updateWorkout,
  getWeeklyWorkouts
} = require("../models/workouts");

router
// rout to add a workout
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
  // rout to get all workouts
  .get("/", (req, res, next) => {
    getAll()
      .then((workouts) => {
        res.send(workouts);
      })
      .catch(next);
  })
  // rout to get all workouts by user
  .get("/user/:userId", (req, res, next) => {
    const userId = req.params.userId;
    getWorkoutsByUser(userId)
      .then((workouts) => {
        res.send(workouts);
      })
      .catch(next);
  })
  // rout to delete all workouts by user
  .delete("/deleteAll/user/:userId", (req, res, next) => {
    const userId = req.params.userId;
    deleteAll(userId)
    .then((result) => {
      res.send(result);
    })
    .catch(next);
  })

  // rout to delete a workout by id
  .delete("/delete/workout/:workoutId", (req, res, next) => {
    const { workoutId } = req.params;
    deleteWorkout(workoutId)
      .then((result) => {
        res.send(result);
      })
      .catch(next);
  })
  // rout to update a workout by object id
  .put("/update/workout/:workoutId", async (req, res) => {
    try {
      const workoutId = req.params.workoutId; // Get the workout ID from the URL
      const updates = req.body; // Get the updates from the request body
  
      // Call the updateWorkout function
      const result = await updateWorkout(workoutId, updates);
  
      if (result.modifiedCount === 0) {
        res.status(404).json({
          data: null,
          isSuccess: false,
          message: "No workout found with the provided ID, or no changes were made."
        });
      } else {
        res.status(200).json({
          data: result, // Optionally include the updated workout data
          isSuccess: true,
          message: "Workout updated successfully"
        });
      }
    } catch (error) {
      console.error("Error updating workout:", error);
      res.status(500).json({
        data: null,
        isSuccess: false,
        message: "Internal Server Error"
      });
    }
  })
  // rout to get weekly workouts
  .get("/user/weekly/:userId", (req, res, next) => {
    const userId = req.params.userId;
    getWeeklyWorkouts(userId)
      .then((workouts) => {
        res.send(workouts);
      })
      .catch(next);
  })
  

module.exports = router;
