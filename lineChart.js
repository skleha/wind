

function parseAllWindData(text) {

  const METERSPERSECONDCONVERTMPH = 2.23694;
  const allWindData = [];
  const lines = text.split(`\n`);

  for (let i = 2; i < 700; i++) {
    const line = lines[i].split(" ");
    const windSpeed = line[7];

    let windDate = new Date(
      parseInt(line[0]),      // year
      parseInt(line[1] - 1),  // month index
      parseInt(line[2]),      // day
      parseInt(line[3] - 8),  // UTC hour converted to local
      parseInt(line[4])       // minute
    )

  allWindData.push({
    date: windDate,
    hourValue: windDate.getHours() + windDate.getMinutes() / 60,
    value: parseFloat((windSpeed * METERSPERSECONDCONVERTMPH).toFixed(2))
  });

  return allWindData;
  }
}






d3.text("https://cors-anywhere.herokuapp.com/https://www.ndbc.noaa.gov/data/realtime2/FTPC1.txt", function (error, text) {
  if (error) throw error;

  // const METERSPERSECONDCONVERTMPH = 2.23694;
  // const allWindData = []; 
  // let displayData, dayMinus0, dayMinus1;
  // const lines = text.split(`\n`);

  // for (let i = 2; i < 700; i++) {
  //   const line = lines[i].split(" ");
  //   const windSpeed = line[7];

  //   let windDate = new Date(
  //     parseInt(line[0]),      // year
  //     parseInt(line[1] - 1),  // month index
  //     parseInt(line[2]),      // day
  //     parseInt(line[3] - 8),  // UTC hour converted to local
  //     parseInt(line[4])       // minute
  //   )

  //   allWindData.push({
  //     date: windDate,
  //     hourValue: windDate.getHours() + windDate.getMinutes() / 60,
  //     value: parseFloat((windSpeed * METERSPERSECONDCONVERTMPH).toFixed(2))
  //   });

    const allWindData = parseAllWindData(text);


    const today = new Date();
    today.setHours(today.getHours() - 8);

    const startMinus0 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1,
      9) // Graph x-axis always starts at 9am

    const endMinus0 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1,
      18) // Graphy x-axis always finishes at 6pm

    const startMinus1 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 2,
      9) // Graph x-axis always starts at 9am

    const endMinus1 = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 2,
      18) // Graphy x-axis always finishes at 6pm

    dayMinus0 = allWindData.filter(ele => {
      return ele.date.getTime() > startMinus0.getTime() &&
        ele.date.getTime() < endMinus0.getTime();
    })

    dayMinus1 = allWindData.filter(ele => {
      return ele.date.getTime() > startMinus1.getTime() &&
        ele.date.getTime() < endMinus1.getTime();
    })

    displayData = {
      dayMinus0,
      dayMinus1
    };


  }

  let margin = { top: 10, right: 30, bottom: 48, left: 55 },
    width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  let svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")")


  let x = d3.scaleLinear()
    .domain([8, 19])
    .range([0, width])

  let xAxisCall = d3.axisBottom(x);
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisCall)

  let y = d3.scaleLinear()
    .domain([0, 25])
    .range([height, 0])

  let yAxisCall = d3.axisLeft(y);
  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxisCall);

  let line = svg
    .append('g')
    .append("path")
      .datum(displayData.dayMinus0)
      .attr("d", d3.line()
        .x((d) => { return x(d.hourValue) })
        .y((d) => { return y(d.value) }))
      .attr("stroke", "#4287f5")
      .style("fill", "none")
      .style("stroke-width", 3)
  
  let dot = svg
    .selectAll("circle")
    .data(displayData.dayMinus0)
    .enter()
    .append("circle")
      .attr("cx", d => { return x(d.hourValue) })
      .attr("cy", d => { return y(d.value) })
      .attr("r", 4)
      .style("fill", "#4287f5")

  svg.append("text")
    .attr("transform",
      "translate(" + (width / 2) + " ," +
      (height + margin.top + 30) + ")")
    .style("text-anchor", "middle")
    .text("time (24h)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("speed in miles per hour (mph)");

  let allData = ["dayMinus0", "dayMinus1"];

  d3.select("#selectButton")
    .selectAll('myOptions')
      .data(allData)
    .enter()
      .append('option')
    .text(function (d) {return d; })
    .attr("value", function (d) { return d; })

  function update(selectedData) {

    let dataFilter = displayData[selectedData];

    line
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x(function (d) { return x(d.hourValue) })
        .y(function (d) { return y(d.value) })
      )
  
    dot
      .data(dataFilter)
      .transition()
      .duration(1000)
        .attr("cx", d => { return x(d.hourValue) })
        .attr("cy", d => { return y(d.value) })

  }

  d3.select("#selectButton").on("change", function(d) {
    let selectedOption = d3.select(this).property("value")
    update(selectedOption)
  })

});
