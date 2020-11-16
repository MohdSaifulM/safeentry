require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api/v1", require("./routes/company.routes"));

app.get("*", (req, res) => {
  res.status(404).json({ message: "Tu es perdu?" });
});

app.listen(process.env.PORT, () => {
  console.log(`running on ${process.env.PORT}`);
});
