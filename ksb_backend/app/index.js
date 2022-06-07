const Databases = require("./config/database");
Databases.connect();
const express = require("express");
const {
  getUsersList,
  addUser,
  updateUser,
  deleteUser,
} = require("./controller/Users");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3001, function () {
  console.log("listening on 3001");
});

app.get("/getUser", getUsersList);
app.post("/addUser", addUser);

app.put("/updateUser", updateUser);

app.delete("/deleteUser", deleteUser);
