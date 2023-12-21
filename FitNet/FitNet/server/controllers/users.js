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
  .get("/", (req, res, next) => {
    getAll()
      .then((users) => {
        res.send(users);
      })
      .catch(next);
  })
  .post("/seed", (req, res, next) => {
    seed()
      .then(() => {
        res.send({ message: "Users seeded" });
      })
      .catch(next);
  })
  // .get("/searhUser/:search", (req, res, next) => {
  //   const { search } = req.params;
  //   searchUser(search)
  //     .then((users) => {
  //       res.send(users);
  //     })
  //     .catch(next);
  // })

  .get("/searchUser/:search", (req, res, next) => {
    const { search } = req.params;
    if (!search) {
        return res.status(400).send("Search query is required");
    }
    searchUser(decodeURIComponent(search))
      .then(users => {
        if (users.length > 0) {
            res.status(200).send(users);
        } else {
            res.status(404).send("No users found");
        }
      })
      .catch(error => {
          console.error("Error in searchUser:", error);
          next(error);
      });
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

  .get("/:id", (req, res, next) => {
    const { id } = req.params;
    get(id)
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  })
  .delete("/delete/:id", (req, res, next) => {
    const { id } = req.params;
    deleteUser(id)
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  })
  .post("/addUser", (req, res, next) => {
    add(req.body)
      .then((x) => {
        const data = { data: x, isSuccess: true };
        res.send(data);
      })
      .catch(next);
  })
  ///api/v1/users/login
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
