const express = require("express");
const app = express();
const port = 3001;
const db = require("./src/helpers/database");
var bodyParser = require("body-parser");
const cors = require("cors");

// routes
const recipient = require("./src/routes/recipient");
const recipient_list = require("./src/routes/recipient_list");
const newsletter = require("./src/routes/newsletter");
const mail = require("./src/routes/mail_routes");

app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors());
app.options("*", cors());

app.use("/recipient", recipient);
app.use("/recipient_list", recipient_list);
app.use("/newsletter", newsletter);
app.use("/mail", mail);

app.listen(port, () => {
  db.on("connected", (data) =>
    console.log(`Example app listening on port ${port}`)
  );
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
});
