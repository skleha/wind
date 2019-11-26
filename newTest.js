const moment = require("moment");
const METERSPERSECONDCONVERTMPH = 2.23694;

debugger;

let margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
let svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.text(
  "https://www.ndbc.noaa.gov/data/realtime2/FTPC1.txt",
  function(error, text) {
    let winds = [];
    const lines = text.split(`\n`);

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
          date: d3.timeParse("%Y-%m-%d-%H-%M")(timestamp),
          value: parseFloat(windSpeed * METERSPERSECONDCONVERTMPH).toFixed(1)
        });
      }
    }

    
    return winds;
  },

  // use the dataset:
  
  function(data) {
    // Add X axis --> it is a date format
    let x = d3
      .scaleTime()
      .domain(
        d3.extent(data, function(d) {
          return d.date;
        })
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    let y = d3
      .scaleLinear()
      .domain([0, 20])
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    // Add the wind line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#69b3a2")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x(function(d) {
            return x(d.date);
          })
          .y(function(d) {
            return y(d.value);
          })
      );

    // Add the points on the wind line
    svg
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return x(d.date);
      })
      .attr("cy", function(d) {
        return y(d.value);
      })
      .attr("r", 5)
      .attr("fill", "#69b3a2");
  }
);