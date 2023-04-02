require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
/////////////////////////////////////////////////////////

const { errors, notFound } = require("./handlers");
const db = require("./models");

//main application
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use("/api/auth", routes.auth);

app.get("/", (req, res) => {
  res.json({ hello: "Hello World!" });
});

app.use(notFound);
app.use(errors);

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
