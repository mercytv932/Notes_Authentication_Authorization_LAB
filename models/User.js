const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

//Hashing password before saving it to MongoDB and saving the new user.
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
});

//When user logs in, take the passowrd they entered and compare it with the stored hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
