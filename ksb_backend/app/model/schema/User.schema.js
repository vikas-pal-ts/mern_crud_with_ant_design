const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  userName: String,
  email: String,
  phone: Number,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
