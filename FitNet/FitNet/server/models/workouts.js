const { ObjectId, connect } = require("./mongo");

const WORKOUT_COLLECTION = "Workouts";

async function getWorkoutCollection() {
  const db = await connect();
  return db.collection(WORKOUT_COLLECTION);
}

/**
 * @param {Object} workout - The workout data.
 * @param {number} workout.userId - The ID of the user who did the workout.
 * @param {string} workout.name - The name of the workout.
 * @param {string} workout.duration - Duration of the workout.
 * @param {number} workout.calories - Calories burned.
 * @param {string} workout.date - Date of the workout.
 * @param {string} workoutId - The ID of the workout to delete.
 */
async function addWorkout(workout) {
  const col = await getWorkoutCollection();
  const result = await col.insertOne(workout);
  return result;
}

/**
 * @param {number} userId - The user's ID.
 */
async function getWorkoutsByUser(userId) {
  console.log("UserId:", userId); // Debugging log
  const col = await getWorkoutCollection();
  return col.find({ userId: userId }).toArray();
}

/**
 * @param {string} workoutId - The Workout's ID.
 * @param {number} userId - The user's ID.
 */
async function getWorkoutsById(workoutId) {
  console.log("workoutId:", workoutId); // Debugging log
  const col = await getWorkoutCollection();
  return col.find({ workoutId: workoutId }).toArray();
}

async function deleteWorkout(workoutId) {
  console.log("WorkoutId:", workoutId); // Debugging log
  const col = await getWorkoutCollection();
  return col.deleteOne({ _id: new ObjectId(workoutId) });
}

async function deleteAll(userId) {
  console.log("userId:", userId); // Debugging log
  const col = await getWorkoutCollection();
  return col.deleteMany({ userId: userId });
}

module.exports = {
  deleteWorkout,
  addWorkout,
  getWorkoutsByUser,
  getWorkoutsById,
  deleteAll,
};
