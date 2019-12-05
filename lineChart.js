
function parseAllWindData(text) {

  const METERSPERSECONDCONVERTMPH = 2.23694;
  const allWindData = [];
  const lines = text.split(`\n`);

  for (let i = 2; i < lines.length; i++) {
    let line = lines[i]
    line = line.replace(/  +/g, ' '); // extra spaces in data
    line = line.split(" ");    

    const windSpeed = line[7];
    if (windSpeed === "") {
      // console.log(line);
      // console.log(windSpeed);
    }
    let windDate = new Date(
      parseInt(line[0]),      // year
      parseInt(line[1] - 1),  // month index
      parseInt(line[2]),      // day
      parseInt(line[3] - 8),  // UTC hour converted to PST
      parseInt(line[4])       // minute
    )

    allWindData.push({
      date: windDate,
      hourValue: windDate.getHours() + windDate.getMinutes() / 60,
      value: parseFloat((windSpeed * METERSPERSECONDCONVERTMPH).toFixed(2))
    });
  }

  return allWindData;
}


function averageData(oneDayData) {
  const averageData = [];

  for (var i = 9; i < 18; i++) {
    let count = 0;
    let sum = 0;

    oneDayData.forEach(ele => {
      if (ele.hourValue >= i && ele.hourValue < (i + 1)) {
        sum += ele.value;
        count++;
      }
    });

    if (count != 0) {
      averageData.push({
        hourValue: i + .5,
        value: parseFloat((sum / count).toFixed(2)),
      })
    }
  }

  return averageData;
}



function createDisplayData(allWindData) {
  const displayData = {};
  const today = new Date();
  today.setHours(today.getHours() - 8);

  for (var i = 0; i <= 5; i++) {

    let begin = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - i,
      9
    )

    let end = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - i,
      18
    )

    const oneDayData = allWindData.filter(ele => {    
      return ele.date.getTime() > begin.getTime() &&
        ele.date.getTime() < end.getTime();
    });

    displayData[`dayMinus${i}`] = oneDayData;
    displayData[`avgDayMinus${i}`] = averageData(oneDayData);
  }

  return displayData;
}


function getDataSetName(displayName) {
  const displayNameToDataName = { 
    "Yesterday" : "dayMinus1",
    "Two Days Ago" : "dayMinus2",
    "Three Days Ago" : "dayMinus3",
    "Four Days Ago" : "dayMinus4",
    "Five Days Ago" : "dayMinus5",
  }

  return displayNameToDataName[displayName];
}

function getAvgSetName(displayName) {
  const displayNameToAvgName = {
    "Yesterday": "avgDayMinus1",
    "Two Days Ago": "avgDayMinus2",
    "Three Days Ago": "avgDayMinus3",
    "Four Days Ago": "avgDayMinus4",
    "Five Days Ago": "avgDayMinus5",
  }

  return displayNameToAvgName[displayName];
}

function getDisplayNameFromAvgSetName(avgSetName) {
  const avgSetNameToDisplayName = {
    "avgDayMinus1": "Yesterday",
    "avgDayMinus2": "Two Days Ago", 
    "avgDayMinus3": "Three Days Ago",
    "avgDayMinus4": "Four Days Ago",
    "avgDayMinus5": "Five Days Ago",
  }

  return avgSetNameToDisplayName[avgSetName]
}


function niceFormatDate(jsDateObject) {
  
  const monthIndex = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  }

  const month = monthIndex[jsDateObject.getMonth()];
  const day = jsDateObject.getDate();
  const year = jsDateObject.getFullYear();
  return `${month} ${day}, ${year}`;
}

function getDateString(displayName) {
  const displayNameToDate = {};
  const today = new Date();
  today.setHours(today.getHours() - 8);
  const displayNames = [
    "Yesterday",
    "Two Days Ago",
    "Three Days Ago",
    "Four Days Ago",
    "Five Days Ago"
  ];

  i = 0;
  while (i < displayNames.length) {
    today.setDate(today.getDate() - 1)
    displayNameToDate[displayNames[i]] = niceFormatDate(today);
    i++;
  }

  return displayNameToDate[displayName];
}


// d3.text("https://cors-anywhere.herokuapp.com/https://www.ndbc.noaa.gov/data/realtime2/46026.txt", function (error, text) {
  if (error) throw error;

  const allWindData = parseAllWindData(text);
  const displayData = createDisplayData(allWindData);

  let margin = { top: 10, right: 30, bottom: 48, left: 55 },
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  let svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")")
    
  // Axes

  let x = d3.scaleLinear()
    .domain([8, 19])
    .range([0, width])

  let xAxisCall = d3.axisBottom(x);
  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxisCall)

  let y = d3.scaleLinear()
    .domain([0, 45])
    .range([height, 0])

  let yAxisCall = d3.axisLeft(y);
  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxisCall);

  let currentDay = svg
    .append("g")
    .append("path")
      .datum(displayData.dayMinus0)
      .attr("d", d3.line()
        .x((d) => { return x(d.hourValue) })
        .y((d) => { return y(d.value) }))
      .attr("stroke", "#000000")
      .style("fill", "none")
      .style("stroke-width", 3)

  let currentAvg = svg
    .append("g")
    .append("path")
    .datum(displayData.avgDayMinus0)
    .attr("d", d3.line()
      .curve(d3.curveBasis)
      .x((d) => { return x(d.hourValue) })
      .y((d) => { return y(d.value) }))
    .attr("stroke", "#DC2828")
    .style("fill", "none")
    .style("stroke-width", 2)

  let comparisonDay = svg
    .append("g")
    .append("path")
      .datum(displayData.dayMinus1)
      .attr("d", d3.line()
        .x((d) => { return x(d.hourValue) })
        .y((d) => { return y(d.value) }))
      .attr("stroke", "#4287f5")
      .style("fill", "none")
      .style("stroke-width", 3)
  
  let comparisonAvg = svg
    .append("g")
    .append("path")
    .datum(displayData.avgDayMinus1)
      .attr("d", d3.line()
        .curve(d3.curveBasis)
        .x((d) => { return x(d.hourValue) })
        .y((d) => { return y(d.value) }))
    .attr("stroke", "#4287f5")
    .style("fill", "none")
    .style("stroke-width", 2)

  let comparisonPoint = svg
    .selectAll("circle")
    .data(displayData.dayMinus1)
    .enter()
    .append("circle")
      .attr("cx", d => { return x(d.hourValue) })
      .attr("cy", d => { return y(d.value) })
      .attr("r", 4)
      .style("fill", "#4287f5")


  // Axis labels

  let graphTitle = svg.append("text")
    .attr("transform",
      "translate(" + (width / 2) + " ," +
      (5) + ")")
    .style("text-anchor", "middle")
    .text(getDateString("Yesterday"));

  svg.append("text")
    .attr("transform",
      "translate(" + (width / 2) + " ," +
      (height + margin.top + 30) + ")")
    .style("text-anchor", "middle")
    .text("time of day (24h)");

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("speed in miles per hour (mph)");

  // Update display based on drop down

  function dropdownUpdate(selectedData) {
    
    const dataSetName = getDataSetName(selectedData);
    const dataFilter = displayData[dataSetName];

    comparisonDay
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x(function (d) { return x(d.hourValue) })
        .y(function (d) { return y(d.value) })
      )
  
    comparisonPoint
      .data(dataFilter)
      .transition()
      .duration(1000)
        .attr("cx", d => { return x(d.hourValue) })
        .attr("cy", d => { return y(d.value) })


    const avgSetName = getAvgSetName(selectedData);
    const avgDataFilter = displayData[avgSetName];

    comparisonAvg
      .datum(avgDataFilter)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .curve(d3.curveBasis)
        .x(function (d) { return x(d.hourValue) })
        .y(function (d) { return y(d.value) })
      )

    const dateString = getDateString(selectedData);

    graphTitle
      .text(dateString)

  }

  // Drop down event handler

  d3.select("#selectButton").on("change", function(d) {
    let selectedOption = d3.select(this).property("value");
    dropdownUpdate(selectedOption);
  })

  const checkboxData = [currentDay, currentAvg, comparisonDay, comparisonAvg];


  function checkboxUpdate() {
    
    d3.selectAll(".checkbox").each(function(d) {
      cb = d3.select(this);
      idx = cb.property("value");

      if (cb.property("checked")) {
        checkboxData[idx]
          .transition()
          .duration(750)
          .style("opacity", 1)
        
        if (idx === "2") {
          svg.selectAll("circle")
            .transition()
            .duration(750)
            .style("opacity", 1)          
        }

      } else {
        checkboxData[idx]
          .transition()
          .duration(750)
          .style("opacity", 0)
          
        if (idx === "2") {
          svg.selectAll("circle")
            .transition()
            .duration(750)
            .style("opacity", 0)
        }  
      }
    })
  }

  d3.selectAll(".checkbox").on("change", checkboxUpdate);
  checkboxUpdate();


  function animateComparisonAvg(idx) {
    const dataSet = `avgDayMinus${idx + 1}`
    const currentDisplay = displayData[dataSet]

    comparisonAvg
      .datum(currentDisplay)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .curve(d3.curveBasis)
        .x(function (d) { return x(d.hourValue) })
        .y(function (d) { return y(d.value) })
      )

    const displayName = getDisplayNameFromAvgSetName(dataSet);
    const dateString = getDateString(displayName);
    
    graphTitle
      .text(dateString)

  }

  d3.select("#animateButton").on("click", () => {
    let i = 0;
    let myInterval = setInterval(() => {
      animateComparisonAvg(i);
      i++
      if (i === 5)  {
        clearInterval(myInterval);
      }
    }, 1000);


  });

});
