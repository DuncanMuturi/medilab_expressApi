// test_name, test_desc, test_cost, more_info
let mongoose = require("mongoose");
let uniqueValidator = require("mongoose-unique-validator");

let testSchema = mongoose.Schema({
  test_name: {
    type: String,
    required: true,
    unique: true,
  },
  test_desc: {
    type: String,
    required: true,
  },
  test_cost: {
    type: Number,
    required: true,
  },
  more_info: {
    type: String,
    required: true,
  },
  reg_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

testSchema.plugin(uniqueValidator, { message: "Test Already Exists" });
module.exports = mongoose.model("Test", testSchema);
