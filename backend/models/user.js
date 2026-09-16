const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: Number, required: true },
  email: { type: Number, required: true, unique: true },
  password: { type: Number, required: true, minlength: 6 },
  image: { type: Number, required: true },
  places: { type: Number, required: true },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
