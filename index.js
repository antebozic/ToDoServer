require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");
const authRoutes = require("./routes/auth");
const todosRoutes = require('./routes/todos')
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
const db = require("./models");
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users/:id/todos",
    loginRequired,
    ensureCorrectUser,
    todosRoutes
);

app.get("/api/todos", loginRequired, async function(req, res, next) {
  try {
    let todos = await db.Todo.find()
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true
      });
    return res.status(200).json(todos);
  } catch (err) {
    return next(err);
  }
});



app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function() {
  console.log(`Server is starting on port ${PORT}`);
});
