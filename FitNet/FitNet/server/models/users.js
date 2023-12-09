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
 */

/**

 * @param {string} id 
 * @param {Object} updates - Object containing the fields to be updated.
 */
async function updateUser(id, updates) {
  const col = await getCollection();

  // Fields that should not be updated
  const forbiddenUpdates = ['id', 'username', 'password'];

  // Remove forbidden fields from updates
  forbiddenUpdates.forEach(field => {
    if (updates.hasOwnProperty(field)) {
      delete updates[field];
    }
  });

  // Perform the update
  const result = await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );

  return result;
}

const COLLECTION_NAME = 'Users';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}


/**
 * @returns {Promise<Users[]>}
 */
async function getAll() {
  const col = await getCollection();
  return col.find({}).toArray();
}

/**
 * @param {string} id
 */
async function get(id) {
  const col = await getCollection();
  return await col.findOne({ _id: new ObjectId(id) });
}


async function add(user) {
  const col = await getCollection();
  const result = await col.insertOne(user);
  return result
}

async function deleteUser(id) {  
  const col = await getCollection();
  const result = await col.deleteOne({ _id: new ObjectId(id) });
  return result;
}



async function seed() {
  const col = await getCollection();
  await col.insertMany(data.users);
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
  getAll, get, getCollection, seed, add, generateJWT, verifyJWT, updateUser,deleteUser
};