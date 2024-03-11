const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/", async (req, res) => {
  // ... Handle post
});

app.listen(3001);
