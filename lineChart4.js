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
      value: parseFloat((windSpeed * METERSPERSECONDCONVERTMPH).toFixed(1))
    });
  }
});

console.log(windData);


let margin = { top: 10, right: 30, bottom: 48, left: 55 },
  width = 500 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

let svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")")

let x = d3.scaleTime()
  .domain(d3.extent(windData, (d) => { return d.date; }))
  .range([0, width])

let xAxisCall = d3.axisBottom(x);
svg.append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxisCall)

let y = d3.scaleLinear()
  .domain([0, 30])
  .range([height, 0])

let yAxisCall = d3.axisLeft(y);
svg.append("g")
  .attr("class", "y-axis")
  .call(yAxisCall);


svg.append("path")
  .datum(windData)
  .attr("fill", "none")
  .attr("stroke", "#4287f5")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x((d) => { return x(d.date) })
    .y((d) => { return y(d.value) })
  )

svg.append("g")
  .selectAll("dot")
  .data(windData)
  .enter()
  .append("circle")
  .attr("cx", d => { return x(d.date) })
  .attr("cy", d => { return y(d.value) })
  .attr("r", 6)
  .attr("fill", "#4287f5")

svg.append("text")
  .attr("transform",
    "translate(" + (width / 2) + " ," +
    (height + margin.top + 30) + ")")
  .style("text-anchor", "middle")
  .text("time");

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("speed in miles per hour (mph)");

