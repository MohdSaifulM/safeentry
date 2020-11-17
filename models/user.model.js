const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  token: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  companies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
  ],
  //#1
  //   isAdmin: { type: Boolean, default: false },
  //   isCompany: { type: Boolean, default: true },
  //#2
  user_type: {
    type: String,
    enum: ["admin", "company", "manager"],
    default: "company",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
