let express = require("express");
let app = express();
let cors = require("cors");

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  const date_string = req.params.date;
  let unixTimeStamp;
  let utcTimeStamp;
  if (!date_string.match(/\d{5,}/)) {
    unixTimeStamp = new Date(date_string).getTime();
    utcTimeStamp = new Date(date_string).toUTCString();
  } else {
    const myDate = parseInt(date_string);
    unixTimeStamp = new Date(myDate).getTime();
    utcTimeStamp = new Date(myDate).toUTCString();
  }
  if (!unixTimeStamp || !utcTimeStamp) {
    res.json({ error: "Invalid Date" });
  }
  res.json({ unix: unixTimeStamp, utc: utcTimeStamp });
});

app.get("/api/", (req, res) => {
  let unixTimeStamp;
  let utcTimeStamp;
  unixTimeStamp = new Date().getTime();
  utcTimeStamp = new Date().toUTCString();
  res.json({ unix: unixTimeStamp, utc: utcTimeStamp });
});

let listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
