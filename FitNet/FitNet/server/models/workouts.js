const { ObjectId, connect } = require("./mongo");
const moment = require('moment-timezone');


/**
 * @typedef {Object} workout - The workout data.
 * @property {number} workout.userId - The ID of the user who did the workout.
 * @property {string} workout.name - The name of the workout.
 * @property {string} workout.duration - Duration of the workout.
 * @property {number} workout.calories - Calories burned.
 * @property {string} workout.date - Date of the workout.
 * @property {string} workoutId - The ID of the workout to delete.
 * @property {boolean} workout.completed - Whether the workout is completed.
 * @property {string} dayOfWeek - The day of the week.
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

async function updateWorkout(id, updates) {
  const col = await getWorkoutCollection();

  // Fields that should not be updated
  const forbiddenUpdates = ['_id', 'userId', 'workoutId'];
  // Remove forbidden fields from updates
  forbiddenUpdates.forEach(field => {
    if (updates.hasOwnProperty(field)) {
      delete updates[field];
    }
  });
  // Perform the update
  console.log("Updating workout:", id, updates);
  const result = await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );
  return result;
}
async function getWeeklyWorkouts(userId) {
  const numericUserId = Number(userId);
  if (isNaN(numericUserId)) {
    console.error("Invalid userId:", userId);
    throw new Error("Invalid userId");
  }

  const col = await getWorkoutCollection();

  // Calculate the date of the last Sunday in local timezone
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of the day
  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - today.getDay()-1);

  // Calculate the date for the upcoming Saturday in local timezone
  const nextSaturday = new Date(lastSunday);
  nextSaturday.setDate(lastSunday.getDate() + 6);
  nextSaturday.setHours(23, 59, 59, 999); // Set to end of the day

  // Convert last Sunday and next Saturday's dates to ISO dates for MongoDB comparison
  const lastSundayISO = lastSunday.toISOString();
  const nextSaturdayISO = nextSaturday.toISOString();

  // Find workouts between last Sunday and the upcoming Saturday
  return col.find({
    userId: numericUserId,
    date: {
      $gte: lastSundayISO,
      $lte: nextSaturdayISO
    }
  }).toArray();
}



module.exports = {
  deleteWorkout,
  addWorkout,
  getWorkoutsByUser,
  getWorkoutsById,
  deleteAll,
  getWorkoutCollection,
  getAll,
  updateWorkout,
  getWeeklyWorkouts
};
