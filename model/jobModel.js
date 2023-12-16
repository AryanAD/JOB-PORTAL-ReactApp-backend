const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  location: {
    type: String,
  },
  salary: {
    type: Number,
  },
  deadline: {
    type: Date,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("Job", jobSchema);
