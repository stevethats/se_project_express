const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");

const { createUser, login } = require("./controllers/users");
const auth = require("./middlewares/auth");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.user = {
    _id: "67cf796babb6af9c5ada1c3a",
  };
});

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
