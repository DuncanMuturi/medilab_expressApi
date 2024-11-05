// patient_id, test_id, appointment-date, appointment_time, status, invoice_no
let mongoose = require("mongoose");

let bookingsSchema = mongoose.Schema({
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  test_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  appointment_date: {
    type: String,
    required: true,
  },
  appointment_time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  invoice_no: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingsSchema);
