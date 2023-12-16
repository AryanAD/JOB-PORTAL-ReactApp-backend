const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  designation: {
    type: String,
  },
  service: {
    type: String,
  },
  contact: {
    type: String,
  },
  address: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
 
});

module.exports = mongoose.model("Vendor", vendorSchema);
