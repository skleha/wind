
const date1 = new Date(2019, 10, 26, 12, 15);
const date2 = new Date(2019, 10, 26, 13, 30);
const date3 = new Date(2019, 10, 26, 14, 59);

const timeData = [
  { date: date1, value: 5 },
  { date: date2, value: 10 },
  { date: date3, value: 15 },
];


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
  .domain(d3.extent(timeData, (d) => { return d.date; }))
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
  .datum(timeData)
  .attr("fill", "none")
  .attr("stroke", "#4287f5")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x((d) => { return x(d.date) })
    .y((d) => { return y(d.value) })
  )

svg.append("g")
  .selectAll("dot")
  .data(timeData)
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