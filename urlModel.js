const mongoose = require("mongoose");
const Counter = require("./counterModel");

const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: [true, "original URL cannot be empty"],
    unique: true,
  },
  short_url: {
    type: Number,
  },
});

urlSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counterDoc = await Counter.findByIdAndUpdate(
      "64c65d138b41af3eb002b867",
      { $inc: { counter: 1 } },
      { new: true }
    );
    this.short_url = counterDoc.counter;
    next();
  }
});

const URL = mongoose.model("URL", urlSchema);

module.exports = URL;
