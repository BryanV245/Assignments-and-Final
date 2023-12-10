const { ObjectId, connect } = require("./mongo");

/**
 * @typedef {Object} workout - The workout data.
 * @property {number} workout.userId - The ID of the user who did the workout.
 * @property {string} workout.name - The name of the workout.
 * @property {string} workout.duration - Duration of the workout.
 * @property {number} workout.calories - Calories burned.
 * @property {string} workout.date - Date of the workout.
 * @property {string} workoutId - The ID of the workout to delete.
 */

const WORKOUT_COLLECTION = "Workouts";
async function getWorkoutCollection() {
  const db = await connect();
  return db.collection(WORKOUT_COLLECTION);
}

async function getAll() {
  const col = await getWorkoutCollection();
  return col.find({}).toArray();
}

async function addWorkout(workout) {
  const col = await getWorkoutCollection();
  const result = await col.insertOne(workout);
  return result;
}

async function getWorkoutsByUser(userId) {
  const numericUserId = Number(userId);
  if (isNaN(numericUserId)) {
    console.error("Invalid userId:", userId);
    throw new Error("Invalid userId");
  }
  const col = await getWorkoutCollection();
  return col.find({ userId: numericUserId }).toArray();
}


async function getWorkoutsById(workoutId) {
  console.log("deleting workout:", workoutId); // Debugging log
  const col = await getWorkoutCollection();
  return col.find({ workoutId: workoutId }).toArray();
}

async function deleteWorkout(workoutId) {
  console.log("deleting WorkoutId:", workoutId); // Debugging log
  const col = await getWorkoutCollection();
  return col.deleteOne({ _id: new ObjectId(workoutId) });
}

async function deleteAll(userId) {
  const numericUserId = Number(userId);
  if (isNaN(numericUserId)) {
    console.error("Invalid userId:", userId);
    throw new Error("Invalid userId");
  }
  const col = await getWorkoutCollection();
  return col.deleteMany({ userId: numericUserId });
}


module.exports = {
  deleteWorkout,
  addWorkout,
  getWorkoutsByUser,
  getWorkoutsById,
  deleteAll,
  getWorkoutCollection,
  getAll
};
