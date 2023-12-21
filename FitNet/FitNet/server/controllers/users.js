const express = require("express");
const {
  getAll,
  seed,
  add,
  generateJWT,
  verifyJWT,
  get,
  updateUser,
  deleteUser,
  searchUser,
} = require("../models/users");
const router = express.Router();

router
// rout to get all users
  .get("/", (req, res, next) => {
    getAll()
      .then((users) => {
        res.send(users);
      })
      .catch(next);
  })
  // seed the json sample data
  .post("/seed", (req, res, next) => {
    seed()
      .then(() => {
        res.send({ message: "Users seeded" });
      })
      .catch(next);
  })

  // rout to search user
  // FINAL EXAM CODE
  .get("/searchUser/:search", (req, res, next) => {
    const { search } = req.params;
    searchUser(search)
      .then((users) => {
        res.send(users);
      })
      .catch(next);
  })

  // Corrected Route to update a user
  .put("/update/user/:id", async (req, res) => {
    try {
      const id = req.params.id; // Get the user ID from the URL
      const updates = req.body; // Get the updates from the request body

      // Call the updateUser function
      const result = await updateUser(id, updates);

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

  // rout to get user by id
  .get("/:id", (req, res, next) => {
    const { id } = req.params;
    get(id)
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  })
  // rout to delete user
  .delete("/delete/:id", (req, res, next) => {
    const { id } = req.params;
    deleteUser(id)
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  })
  // rout to add user
  .post("/addUser", (req, res, next) => {
    add(req.body)
      .then((x) => {
        const data = { data: x, isSuccess: true };
        res.send(data);
      })
      .catch(next);
  })
  // rout to login user
  .post("/login", (req, res, next) => {
    //console.log(req.body)
    const { email, password } = req.body;
    getAll()
      .then(async (users) => {
        const user = users.find(
          (x) => x.email === email && x.password === password
        );
        if (user) {
          const token = await generateJWT(user);
          const loginData = { token, user };

          const data = { data: loginData, isSuccess: true };
          res.send(data);
        } else {
          const data = { data: null, isSuccess: false };
          res.send(data);
        }
      })
      .catch(next);
  });

module.exports = router;
