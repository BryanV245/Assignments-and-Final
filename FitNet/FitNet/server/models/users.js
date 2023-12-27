const { ObjectId, connect } = require('./mongo');
const data = require("../data/users.json"); // Adjusted to the correct file name
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;
const jwt = require('jsonwebtoken');

/**
 * @typedef {Object} User
 * @property {string} role - The user's role.
 * @property {number} id - The user's ID.
 * @property {string} firstName - The user's first name.
 * @property {string} lastName - The user's last name.
 * @property {string} image - The user's image URL.
 * @property {string} gender - The user's gender.
 * @property {number} age - The user's age.
 * @property {string} email - The user's email.
 * @property {string} password - The user's password.
 * @property {string} birthDate - The user's birth date.
 * @property {number} weight - The user's weight.
 * @property {number} calorieGoal
 * @property {number} lifetimeCaloriesBurned
 * @property {number} weeklyCaloriesBurned
 */

//update user function for updating user information
async function updateUser(id, updates) {
  const col = await getCollection();

  // Fields that should not be updated
  const forbiddenUpdates = ['_id', 'userId', 'name', 'password'];
  // Remove forbidden fields from updates
  forbiddenUpdates.forEach(field => {
    if (updates.hasOwnProperty(field)) {
      delete updates[field];
    }
  });
  // Perform the update
  console.log("Updating user:", id, updates);
  const result = await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );
  return result;
}

//get the collection
const COLLECTION_NAME = 'Users';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}


/**
 * @returns {Promise<Users[]>}
 */ //get all users
async function getAll() {
  const col = await getCollection();
  return col.find({}).toArray();
} 

/**
 * @param {string} id
 */ //get user by id - most likely not going to need this
async function get(id) {
  const col = await getCollection();
  return await col.findOne({ _id: new ObjectId(id) });
}

//add user to the database, register tokenization is done in controller
// async function add(user) {
//   const col = await getCollection();
//   const result = await col.insertOne(user);
//   return result
// }

async function add(user) {
  const col = await getCollection();

  // Generate a unique numerical ID
  let uniqueId;
  while (true) {
    uniqueId = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
    const existingUser = await col.findOne({ id: uniqueId });
    if (!existingUser) {
      break; // Exit the loop if the ID is unique
    }
  }
  // Add the unique ID to the user object
  user.id = uniqueId;
  const result = await col.insertOne(user);
  return result;
}

//delete user
async function deleteUser(id) {  
  const col = await getCollection();
  const result = await col.deleteOne({ _id: new ObjectId(id) });
  return result;
}

//seed the json sample data
async function seed() {
  const col = await getCollection();
  await col.insertMany(data.users);
}

// Enhanced function for autocomplete
// FINAL EXAM CODE
async function searchUser(search) {
  const col = await getCollection();
  const query = {
    $or: [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } }
    ]
  };
  const result = await col.find(query).toArray();
  return result;
}







function generateJWT(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(user, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }, (err, token) => {
      if (err) {
        reject(err);
        console.error("Error generating JWT", err);
      } else {
        resolve(token);
      }
    });
  })
}

function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        reject(err);
        console.error("Error verifying JWT", err);
      } else {
        resolve(user);
      }
    });
  })
}


module.exports = {
  getAll, searchUser, get, getCollection, seed, add, generateJWT, verifyJWT, updateUser,deleteUser
};