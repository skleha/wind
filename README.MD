# Windspeed

[Live website!](https://skleha.github.io/wind/)
<br></br>

### Description
Windspeed is a single page application that shows the windspeed over time, as well as its average speed, at Fort Point, San Francisco.  The San Francisco sailing community is the intended audience.  For sailors, awareness of the windspeed is crucial.  Given a certain wind strength, light or strong, a sailor will make decisions before she heads out to sea.  For instance, given a stronger breeze, she might choose a smaller sail and vice versa. Furthermore, the breeze for any one day tends to be autocorrelated; that is, the breeze from one day to the next tends to be similiar.  As such, the conditions you see today will be a strong indicator of what you will see tomorrow (except in the case of storms).  Windspeed, the application, has a pull down menu to show you what the breeze was like for the prior five days. 
<br></br>

![Alt Text](https://media.giphy.com/media/WsWrsfak5tUB52O1B4/giphy.gif)

### Key Features
  * Windspeed over time for Fort Point San Francisco is displayed on a x-y connected scatter plot.
  * The average windspeed is displayed in a red line.
  * Users can select, via a drop down menu, prior days to see what the wind has been like in the recent past.
  
### Select Screenshot
The single page app has an connected x-y scatterplot show a (1) a blue line representing the windspeed at a given time and (2) a red line indicate the average speed for each hour.  Users can select, via a drop down menu, any one of the prior five days.<br></br>
<img src="https://sk-github-screenshots.s3-us-west-1.amazonaws.com/windspeed.png" /><br></br>

### Select Code Snippets
The following is the quick snippet showing the code to parse the data.  The data is provided by an API call to NOAA (National Oceanographic and Atmospheric Administration).  The call returns a .txt file with copious amounts of data for a single weather station, in this case Fort Point, San Francisco.  This data must be parsed to provide a single datum, the windspeed.
```
function parseAllWindData(text) {

  const METERSPERSECONDCONVERTMPH = 2.23694;
  const allWindData = [];
  const lines = text.split(`\n`);

  for (let i = 2; i < lines.length; i++) {
    let line = lines[i]
    line = line.replace(/  +/g, ' ');
    line = line.split(" ");
```

The application makes use of the popular D3 library.  Here, the line for a single day is drawn on a SVG (scalable vector graphic).
```
let line = svg
    .append('g')
    .append("path")
      .datum(displayData.dayMinus1)
      .attr("d", d3.line()
        .x((d) => { return x(d.hourValue) })
        .y((d) => { return y(d.value) }))
      .attr("stroke", "#4287f5")
      .style("fill", "none")
      .style("stroke-width", 3)
```

The logic to transition from one line to the next makes use of the D3 ```transition``` method.
```
    const dataSetName = getDataSetName(selectedData);
    const dataFilter = displayData[dataSetName];

    line
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr("d", d3.line()
        .x(function (d) { return x(d.hourValue) })
        .y(function (d) { return y(d.value) })
      )
```

### Key Technologies
  * JavaScript
  * D3

### Future Implementations
The development roadmap for Windspeed includes additional data displays and animation.  First, the data will show the current day's data, permanently overlayed next to prior days.  In this way, the user might better see the juxtaposition between today and prior days. Second, users will see lines indicating max and minimum windspeeds on the chart for the display of any prior day.  This will allow easy reference to answer the question, 'how strong did the breeze get yesterday?' Finally, some animation:  users will click on a button and see an animation representing the transition between the prior five days of breeze.

