const METERSPERSECONDCONVERTMPH = 2.23694;
const windData = [];

d3.text("https://www.ndbc.noaa.gov/data/realtime2/FTPC1.txt", function (error, text) {
  if (error) throw error;
  
  const lines = text.split(`\n`);

  for (let i = 2; i < 5; i++) {
    const line = lines[i].split(" ");
    const windSpeed = line[7];

    let windDate = new Date(
      parseInt(line[0]),
      parseInt(line[1] - 1),
      parseInt(line[2]),
      parseInt(line[3] - 8),
      parseInt(line[4])
    )
  
    windData.push({
      date: windDate,
      value: parseFloat(windSpeed * METERSPERSECONDCONVERTMPH).toFixed(1)
    });
  }
});

console.log(windData);
