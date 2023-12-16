const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appliedJobSchema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: "Job",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "pending",
    },
    cv: {
      type: String,
    },
    location: {
      type: String,
    },
    contact: {
      type: String,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("appliedJob", appliedJobSchema);
