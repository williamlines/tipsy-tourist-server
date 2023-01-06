var express = require("express");
var cors = require("cors");
var app = express();
var PORT = 4000;
const apiKey = require("./apiKey");

app.use(cors());
app.use(express.json());

// Without middleware
app.get("/", function (req, res) {
  // Equivalent to res.status(200).send('OK')
  res.sendStatus(200);
});

async function Locations(lat, lng) {
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=300&keyword=bar&rankby=prominence&key=${apiKey}`
  );
  const data = await resp.json();
  console.log(data);
  return data;
}

app.post("/places", async function (req, res) {
  //res.send("testing");
  console.log(req.body);
  const lat = req.body.lat;
  const lng = req.body.lng;
  const data = await Locations(lat, lng);
  res.send(data);
});

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
