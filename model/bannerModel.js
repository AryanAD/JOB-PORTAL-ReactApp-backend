const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
});

module.exports = mongoose.model("Banner", bannerSchema);
