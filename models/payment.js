let mongoose = require("mongoose");

let payment_schema = mongoose.Schema({
  invoice_no: {
    type: String,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Not Paid",
  },
  paid_on: {
    type: Date,
  },
});

module.exports = mongoose.model("Payment", payment_schema);
