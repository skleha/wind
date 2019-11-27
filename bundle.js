(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


d3.text("https://www.ndbc.noaa.gov/data/realtime2/FTPC1.txt", function (error, text) {
  if (error) throw error;
  
  const METERSPERSECONDCONVERTMPH = 2.23694;
  const allWindData = [];
  let day0Data;
  const lines = text.split(`\n`);

  for (let i = 2; i < 150; i++) {
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

    const today = new Date();
    today.setHours(today.getHours() - 8);

    const start = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      9)

    const end = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      18)

    day0Data = allWindData.filter(ele => {
      return ele.date.getTime() > start.getTime() &&
        ele.date.getTime() < end.getTime();
    })

  }

  
  let margin = { top: 10, right: 30, bottom: 48, left: 55 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

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
    .domain([0, 30])
    .range([height, 0])

  let yAxisCall = d3.axisLeft(y);
  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxisCall);


  svg.append("path")
    .datum(day0Data)
    .attr("fill", "none")
    .attr("stroke", "#4287f5")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x((d) => { return x(d.hourValue) })
      .y((d) => { return y(d.value) })
    )

  svg.append("g")
    .selectAll("dot")
    .data(day0Data)
    .enter()
    .append("circle")
    .attr("cx", d => { return x(d.hourValue) })
    .attr("cy", d => { return y(d.value) })
    .attr("r", 4)
    .attr("fill", "#4287f5")

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

});

},{}]},{},[1]);
