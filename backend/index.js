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

app.post("/uploadHorario", async (req, res) => {
  const { file } = req.body;
  try {
    const csvData = await getFile(file);
    return res.json({ csvData });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch CSV file" });
  }
});

async function getFile(url) {
  const response = await axios.get(url);
  return response.data;
}

app.listen(3001);
