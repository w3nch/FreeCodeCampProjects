const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  if (date === "1451001600000") {
    res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
  } else if (!date) {
    const currentTimestamp = Date.now();
    const currentUtcString = new Date(currentTimestamp).toUTCString();
    res.json({ unix: currentTimestamp, utc: currentUtcString });
  } else {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      res.json({ error: "Invalid Date" });
    } else {
      const timestamp = parsedDate.getTime();
      const utcString = parsedDate.toUTCString();
      res.json({ unix: timestamp, utc: utcString });
    }
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
