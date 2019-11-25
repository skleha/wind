const request = require("request");
const moment = require("moment");
const METERSPERSECONDCONVERTMPH = 2.23694;

let winds = [];

request("https://www.ndbc.noaa.gov/data/realtime2/FTPC1.txt", function(
  error,
  response,
  body
) {
  const lines = body.split(`\n`);
  // let winds = [];

  for (let i = 2; i < 12; i++) {
    const line = lines[i].split(" ");
    const windSpeed = line[7];

    const date = {
      year: line[0],
      month: line[1],
      day: line[2],
      hour: line[3],
      minute: line[4]
    };

    if (!date.year || !date.month || !date.day || !date.hour || !date.minute)
      continue;

    const timestamp = moment(
      `${date.year}-${date.month}-${date.day}T${date.hour}:${date.minute}`
    )
      .subtract(8, "hours")
      .format("YYYY-MM-DD-hh-mm");

    if (windSpeed) {
      winds.push({
        date: timestamp,
        value: parseFloat(windSpeed * METERSPERSECONDCONVERTMPH).toFixed(1),
      });
    }
  }

  console.log(winds);
});


exports.winds = winds;

