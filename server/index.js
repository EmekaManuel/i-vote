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

app.get("/", (req, res) => {
  res.json({ hello: "Hello World!" });
});
app.use("/api/auth", routes.auth);
app.use('/api/polls', routes.poll)



app.use(notFound);
app.use(errors);

app.listen(port, () => {
  console.log(` app listening on port ${port}`);
});
