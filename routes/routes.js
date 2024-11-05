let express = require("express");
let router = express.Router();
let Patient = require("../models/patient");
let Location = require("../models/location");
let Booking = require("../models/booking");
let Nurse = require("../models/nurse");
let Test = require("../models/test");
let Location = require("../models/location");
let bcrypt = require("bcrypt");
let genInvoiceNo = require("../functions/RandomInvoiceNo");
let Payment = require("../models/payment");

// add & view patients - done
// add & view locations - done
// add & view tests - done
// add & view nurses - pending
// add & view booking - pending
// add & view admins
// payments via mpesa

// require login
router.post("/add_patient", async (req, res) => {
  let patient = new Patient(req.body);
  try {
    let saved_patient = await patient.save();
    let location_id = req.body.location_id;
    let location = await Location.findById(location_id);
    if (location) {
      location.patients.push(saved_patient._id);
      const updated_location = await location.save();
    }
    res.status(200).json({ message: "Patient Added Succesfully" });
  } catch (err) {
    console.log(err);
    res.status(204).json({ message: err.message });
  }
});

router.get("/patients", async (req, res) => {
  try {
    let patients = Patient.find();
    // to update
    res.status(200).json(patients);
  } catch (err) {
    res.status(204).json({ message: err.message });
  }
});

router.post("/add_location", async (req, res) => {
  let location = new Location(req.body);
  try {
    let saved_location = await location.save();
    res.status(200).json({ message: "Location added successfully" });
  } catch (err) {
    res.status(204).json({ message: err.message });
  }
});

router.get("/locations", async (req, res) => {
  try {
    let locations = Location.find();
    // to update
    res.status(200).json(locations);
  } catch (err) {
    res.status(204).json({ message: err.message });
  }
});

router.post("/add_test", async (req, res) => {
  let labtest = new Test(req.body);
  try {
    let savedTest = await labtest.save();
    res.status(200).json({ message: "Lab Test added successfully" });
  } catch (err) {
    res.status(204).json({ message: err.message });
  }
});

router.get("/view_tests", async (req, res) => {
  try {
    let tests = await Test.find();
    res.status(200).json(tests);
  } catch (err) {
    res.status(204).json({ message: err.message });
  }
});

router.post("/add_nurse", async (req, res) => {
  let nurse = req.body;
  let hashed_password = await bcrypt.hash("Nurse2024", 10);
  nurse.password = hashed_password;

  nurse = new Nurse(nurse);
  try {
    let savedNurse = await nurse.save();
    res.status(200).json({ message: "Nurse added succesfully" });
  } catch (err) {
    res.status(204).json({ message: err.message });
  }
});
// line 91 - 97 == select surname, others, gender, ...phone from nurses
router.get("/view_nurses", async (req, res) => {
  try {
    let nurses = await Nurse.find({
      surname: 1,
      others: 1,
      gender: 1,
      email: 1,
      reg_date: 1,
      phone: 1,
    });
    res.status(200).json(nurses);
  } catch (err) {
    console.log(err);
    res.status(204).json({ message: err.message });
  }
});

router.post("/add_booking", async (req, res) => {
  let booking = re.body;
  try {
    let invoice_no = genInvoiceNo();
    booking.invoice_no = invoice_no;
    booking = new Booking(booking);
    let savedBooking = await booking.save();
    // genInvoiceNo
    let total_amount = 0;
    let test_id = booking.test_id;

    let test = await Test.findById(test_id);
    total_amount += test.test_cost;

    let payment = new Payment({
      invoice_no: invoice_no,
      total_amount: total_amount,
    });

    let savedPayment = await payment.save();
    // initialize stk push
    res.status(200).json({ message: "booking made Succesfully" });
  } catch (err) {
    res.status(204).json({ message: err.message });
  }
});

router.get("/view_bookings", async (req, res) => {
  try {
    let bookings = await Booking.find().populate(["patient_id", "test_id"]);
    res.status(200).json(bookings);
  } catch (err) {
    res.status(204).json({ message: err.message });
  }
});

module.exports = router;
