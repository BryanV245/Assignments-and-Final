const path = require("path");
const express = require("express");
require("dotenv").config();
const users = require("./controllers/users");
const app = express();
const workouts = require("./controllers/workouts");
const { connect } = require("./models/mongo");
const PORT = process.env.PORT ?? 3000;
app

  .use("/", express.static(path.join(__dirname, "../client/dist/")))
  .use(express.json())
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );

    if (req.method === "OPTIONS") {
      return res.status(200).send({});
    }
    next();
  })

  .use("/api/v1/users", users)
  .use('/api/v1/workouts', workouts)

  .get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });

app.use((err, req, res, next) => {
  console.error(err);
  const msg = {
    status: err.code || 500,
    error: err.message || "Internal Server Error",
    isSuccess: false,
  };
  res.status(msg.status).json(msg);
});

console.log("1: Trying to start server...");

app.listen(PORT, async () => {
  console.log(`2: Server is running at http://localhost:${PORT}`);
  connect().then(() => {
    console.log("Database connected");
  });
});

console.log("3: End of file, waiting for requests...");
