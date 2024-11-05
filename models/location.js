let mongoose = require("mongoose");
let Patient = require("./patient");

let location_scheam = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  ],
});

module.exports = mongoose.model("Location", location_scheam);
