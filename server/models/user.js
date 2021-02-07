const db = require("mongoose");

const userSchema = new db.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true },
);
module.exports = db.model("User", userSchema);
