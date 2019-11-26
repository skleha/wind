
const data = [
  { date: 10, value: 10 },
  { date: 20, value: 20 },
  { date: 30, value: 30 }
];

// This works
// d3.text("https://www.ndbc.noaa.gov/data/realtime2/FTPC1.txt", function (error, text) {
//   if (error) throw error;
//   console.log(text); // Hello, world!
// });

// d3.text("sampleWindFile.txt").then((text) => {
//   console.log(text);
// })


// Add a canvas
let svg = d3.select("#my_dataviz").append("svg")
  .attr("width", 400)
  .attr("height", 400)

let circles = svg.selectAll("circle")
  .data(data);

// Append a shape
circles.enter() 
  .append("circle")
    .attr("cx", (d) => { return d.date } )
    .attr("cy", (d) => { return d.value } )
    .attr("r", 5)
    .attr("fill", "red")

