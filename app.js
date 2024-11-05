let express = require("express");
let mongoose = require("mongoose");
let routes = require("./routes/routes");
let body_parser = require("body-parser");
let cors = require("cors");

mongoose.connect("mongodb://localhost:27017/medilab").then(() => {
  let app = express();
  app.use(cors());
  app.use(body_parser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/api", routes);
  app.use(body_parser.json());
  app.listen(3003, () => {
    console.log("App is running on http://127.0.0.1:3003");
  });
});
