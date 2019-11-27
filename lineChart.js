
const data = [
  { date: 10, value: 10 },
  { date: 50, value: 50 },
  { date: 90, value: 90 }
];

let margin = { top: 10, right: 30, bottom: 30, left: 30 },
  width = 500 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

let svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")")

let x = d3.scaleLinear()
  .domain([0, 100])
  .range([0, width])

svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));


let y = d3.scaleLinear()
  .domain([0, 200])
  .range([height, 0])

// svg.append("g")
//   .call(d3.axisLeft(y));

let yAxisCall = d3.axisLeft(y);
  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxisCall);


svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "#69b3a2")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x((d) => { return x(d.date) })
    .y((d) => { return y(d.value) })
  )

svg.append("g")
  .selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => { return x(d.date) })
  .attr("cy", d => { return y(d.value) })
  .attr("r", 8)
  .attr("fill", "#69b3a2")