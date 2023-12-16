const { mongoose, Schema, model } = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "user",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  image: {
    type: String,
    default:
      "https://sm.ign.com/ign_ap/cover/a/avatar-gen/avatar-generations_hugw.jpg",
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
