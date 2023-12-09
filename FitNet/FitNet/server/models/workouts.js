const { ObjectId, connect } = require('./mongo');


const EXERCISE_COLLECTION = 'Exercises';

async function getExerciseCollection() {
  const db = await connect();
  return db.collection(EXERCISE_COLLECTION);
}

/**
 * @param {Object} exercise - The exercise data.
 * @param {number} exercise.userId - The ID of the user who did the exercise.
 * @param {string} exercise.name - The name of the exercise.
 * @param {string} exercise.duration - Duration of the exercise.
 * @param {number} exercise.calories - Calories burned.
 * @param {string} exercise.date - Date of the exercise.
 * @param {string} exerciseId - The ID of the exercise to delete.
 */
async function addExercise(exercise) {
  const col = await getExerciseCollection();
  const result = await col.insertOne(exercise);
  return result;
}

/**
 * @param {number} userId - The user's ID.
 */
async function getExercisesByUser(userId) {
  console.log("UserId:", userId); // Debugging log
  const col = await getExerciseCollection();
  return col.find({ userId: userId }).toArray();
}

/**
 * @param {string} exerciseId - The exercise's ID.
 * @param {number} userId - The user's ID.
 */
async function getExercisesById(exerciseId) {
  console.log("exerciseId:", exerciseId); // Debugging log
  const col = await getExerciseCollection();
  return col.find({ exerciseId: exerciseId }).toArray();
}

async function deleteExercise(exerciseId) {
  console.log("ExerciseId:", exerciseId); // Debugging log
  const col = await getExerciseCollection();
  return col.deleteOne({ _id: new ObjectId(exerciseId) });
}

async function deleteAll(userId) {
  console.log("userId:", userId); // Debugging log
  const col = await getExerciseCollection();
  return col.deleteMany({ userId: userId });
}

// async function getExercisesByUser(userId) {
//   const col = await getExerciseCollection();
//   return col.find({ userId: new ObjectId(userId) }).toArray();
// }

// async function deleteExercise(exerciseId) {
//     const col = await getExerciseCollection();
//     const result = await col.deleteOne({ _id: new ObjectId(exerciseId) });
//     return result;
//   }
  


module.exports = {
  deleteExercise,
  addExercise,
  getExercisesByUser,
  getExercisesById,
  deleteAll
};
