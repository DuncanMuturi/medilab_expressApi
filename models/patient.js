let mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");
let Location = require("./location");

let patient_schema = mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
  reg_date: {
    type: Date,
    default: Date.now,
  },
});

mongoose.Schema.plugin(uniqueValidator, { message: "Email Already in use" });
module.exports = mongoose.model("Patient", patient_schema);
