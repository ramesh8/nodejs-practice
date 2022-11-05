const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  plot: String,
  genres: [String],
  cast: [String],
  year: {
    type: Number,
    min: 1900,
    max: 2050,
  },
  released: Date,
  awards: {
    wins: Number,
    nominations: Number,
    text: String,
  },
});

module.exports = mongoose.model("movie", movieSchema);
