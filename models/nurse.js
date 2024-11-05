// surname, other names, gender, reg_date, email, phone, password
let mongoose = require("mongoose");

let uniqueValidator = require("mongoose-unique-validator");

let nurseSchema = mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  others: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  reg_date: {
    type: Date,
    default: Date.now,
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
  password: {
    type: String,
    required: true,
  },
});

nurseSchema.plugin(uniqueValidator, { message: "Nurse Already Exists" });

module.exports = mongoose.model("Nurse", nurseSchema);
