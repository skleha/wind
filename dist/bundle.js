/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lineChart.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lineChart.js":
/*!**********************!*\
  !*** ./lineChart.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse */ \"./parse.js\");\n\n\n// function parseAllWindData(text) {\n\n//   const METERSPERSECONDCONVERTMPH = 2.23694;\n//   const allWindData = [];\n//   const lines = text.split(`\\n`);\n\n//   for (let i = 2; i < lines.length; i++) {\n//     let line = lines[i]\n//     line = line.replace(/  +/g, ' '); // extra spaces in data\n//     line = line.split(\" \");    \n\n//     const windSpeed = line[7];\n//     if (windSpeed === \"\") {\n//       // console.log(line);\n//       // console.log(windSpeed);\n//     }\n//     let windDate = new Date(\n//       parseInt(line[0]),      // year\n//       parseInt(line[1] - 1),  // month index\n//       parseInt(line[2]),      // day\n//       parseInt(line[3] - 8),  // UTC hour converted to PST\n//       parseInt(line[4])       // minute\n//     )\n\n//     allWindData.push({\n//       date: windDate,\n//       hourValue: windDate.getHours() + windDate.getMinutes() / 60,\n//       value: parseFloat((windSpeed * METERSPERSECONDCONVERTMPH).toFixed(2))\n//     });\n//   }\n\n//   return allWindData;\n// }\n\n\n// function averageData(oneDayData) {\n//   const averageData = [];\n\n//   for (var i = 9; i < 18; i++) {\n//     let count = 0;\n//     let sum = 0;\n\n//     oneDayData.forEach(ele => {\n//       if (ele.hourValue >= i && ele.hourValue < (i + 1)) {\n//         sum += ele.value;\n//         count++;\n//       }\n//     });\n\n//     if (count != 0) {\n//       averageData.push({\n//         hourValue: i + .5,\n//         value: parseFloat((sum / count).toFixed(2)),\n//       })\n//     }\n//   }\n\n//   return averageData;\n// }\n\n// function createDisplayData(allWindData) {\n//   const displayData = {};\n//   const today = new Date();\n//   today.setHours(today.getHours() - 8);\n\n//   for (var i = 0; i <= 5; i++) {\n\n//     let begin = new Date(\n//       today.getFullYear(),\n//       today.getMonth(),\n//       today.getDate() - i,\n//       9\n//     )\n\n//     let end = new Date(\n//       today.getFullYear(),\n//       today.getMonth(),\n//       today.getDate() - i,\n//       18\n//     )\n\n//     const oneDayData = allWindData.filter(ele => {    \n//       return ele.date.getTime() > begin.getTime() &&\n//         ele.date.getTime() < end.getTime();\n//     });\n\n//     displayData[`dayMinus${i}`] = oneDayData;\n//     displayData[`avgDayMinus${i}`] = averageData(oneDayData);\n//   }\n\n//   return displayData;\n// }\n\n\n// function getDataSetName(displayName) {\n//   const displayNameToDataName = { \n//     \"Yesterday\" : \"dayMinus1\",\n//     \"Two Days Ago\" : \"dayMinus2\",\n//     \"Three Days Ago\" : \"dayMinus3\",\n//     \"Four Days Ago\" : \"dayMinus4\",\n//     \"Five Days Ago\" : \"dayMinus5\",\n//   }\n\n//   return displayNameToDataName[displayName];\n// }\n\n// function getAvgSetName(displayName) {\n//   const displayNameToAvgName = {\n//     \"Yesterday\": \"avgDayMinus1\",\n//     \"Two Days Ago\": \"avgDayMinus2\",\n//     \"Three Days Ago\": \"avgDayMinus3\",\n//     \"Four Days Ago\": \"avgDayMinus4\",\n//     \"Five Days Ago\": \"avgDayMinus5\",\n//   }\n\n//   return displayNameToAvgName[displayName];\n// }\n\n// function getDisplayNameFromAvgSetName(avgSetName) {\n//   const avgSetNameToDisplayName = {\n//     \"avgDayMinus1\": \"Yesterday\",\n//     \"avgDayMinus2\": \"Two Days Ago\", \n//     \"avgDayMinus3\": \"Three Days Ago\",\n//     \"avgDayMinus4\": \"Four Days Ago\",\n//     \"avgDayMinus5\": \"Five Days Ago\",\n//   }\n\n//   return avgSetNameToDisplayName[avgSetName]\n// }\n\n\n// function niceFormatDate(jsDateObject) {\n  \n//   const monthIndex = {\n//     0: \"January\",\n//     1: \"February\",\n//     2: \"March\",\n//     3: \"April\",\n//     4: \"May\",\n//     5: \"June\",\n//     6: \"July\",\n//     7: \"August\",\n//     8: \"September\",\n//     9: \"October\",\n//     10: \"November\",\n//     11: \"December\",\n//   }\n\n//   const month = monthIndex[jsDateObject.getMonth()];\n//   const day = jsDateObject.getDate();\n//   const year = jsDateObject.getFullYear();\n//   return `${month} ${day}, ${year}`;\n// }\n\n// function getDateString(displayName) {\n//   const displayNameToDate = {};\n//   const today = new Date();\n//   today.setHours(today.getHours() - 8);\n//   const displayNames = [\n//     \"Yesterday\",\n//     \"Two Days Ago\",\n//     \"Three Days Ago\",\n//     \"Four Days Ago\",\n//     \"Five Days Ago\"\n//   ];\n\n//   i = 0;\n//   while (i < displayNames.length) {\n//     today.setDate(today.getDate() - 1)\n//     displayNameToDate[displayNames[i]] = niceFormatDate(today);\n//     i++;\n//   }\n\n//   return displayNameToDate[displayName];\n// }\n\n\nd3.text(\"https://cors-anywhere.herokuapp.com/https://www.ndbc.noaa.gov/data/realtime2/46026.txt\", function (error, text) {\n  if (error) throw error;\n\n  const allWindData = Object(_parse__WEBPACK_IMPORTED_MODULE_0__[\"parseAllWindData\"])(text);\n  const displayData = Object(_parse__WEBPACK_IMPORTED_MODULE_0__[\"createDisplayData\"])(allWindData);\n\n  let margin = { top: 10, right: 30, bottom: 48, left: 55 },\n    width = 900 - margin.left - margin.right,\n    height = 500 - margin.top - margin.bottom;\n\n  let svg = d3.select(\"#my_dataviz\")\n    .append(\"svg\")\n    .attr(\"width\", width + margin.left + margin.right)\n    .attr(\"height\", height + margin.top + margin.bottom)\n    .append(\"g\")\n    .attr(\"transform\",\n      \"translate(\" + margin.left + \",\" + margin.top + \")\")\n    \n  // Axes\n\n  let x = d3.scaleLinear()\n    .domain([8, 19])\n    .range([0, width])\n\n  let xAxisCall = d3.axisBottom(x);\n  svg.append(\"g\")\n    .attr(\"class\", \"x-axis\")\n    .attr(\"transform\", \"translate(0,\" + height + \")\")\n    .call(xAxisCall)\n\n  let y = d3.scaleLinear()\n    .domain([0, 45])\n    .range([height, 0])\n\n  let yAxisCall = d3.axisLeft(y);\n  svg.append(\"g\")\n    .attr(\"class\", \"y-axis\")\n    .call(yAxisCall);\n\n  let currentDay = svg\n    .append(\"g\")\n    .append(\"path\")\n      .datum(displayData.dayMinus0)\n      .attr(\"d\", d3.line()\n        .x((d) => { return x(d.hourValue) })\n        .y((d) => { return y(d.value) }))\n      .attr(\"stroke\", \"#000000\")\n      .style(\"fill\", \"none\")\n      .style(\"stroke-width\", 3)\n\n  let currentAvg = svg\n    .append(\"g\")\n    .append(\"path\")\n    .datum(displayData.avgDayMinus0)\n    .attr(\"d\", d3.line()\n      .curve(d3.curveBasis)\n      .x((d) => { return x(d.hourValue) })\n      .y((d) => { return y(d.value) }))\n    .attr(\"stroke\", \"#DC2828\")\n    .style(\"fill\", \"none\")\n    .style(\"stroke-width\", 2)\n\n  let comparisonDay = svg\n    .append(\"g\")\n    .append(\"path\")\n      .datum(displayData.dayMinus1)\n      .attr(\"d\", d3.line()\n        .x((d) => { return x(d.hourValue) })\n        .y((d) => { return y(d.value) }))\n      .attr(\"stroke\", \"#4287f5\")\n      .style(\"fill\", \"none\")\n      .style(\"stroke-width\", 3)\n  \n  let comparisonAvg = svg\n    .append(\"g\")\n    .append(\"path\")\n    .datum(displayData.avgDayMinus1)\n      .attr(\"d\", d3.line()\n        .curve(d3.curveBasis)\n        .x((d) => { return x(d.hourValue) })\n        .y((d) => { return y(d.value) }))\n    .attr(\"stroke\", \"#4287f5\")\n    .style(\"fill\", \"none\")\n    .style(\"stroke-width\", 2)\n\n  let comparisonPoint = svg\n    .selectAll(\"circle\")\n    .data(displayData.dayMinus1)\n    .enter()\n    .append(\"circle\")\n      .attr(\"cx\", d => { return x(d.hourValue) })\n      .attr(\"cy\", d => { return y(d.value) })\n      .attr(\"r\", 4)\n      .style(\"fill\", \"#4287f5\")\n\n\n  // Axis labels\n\n  let graphTitle = svg.append(\"text\")\n    .attr(\"transform\",\n      \"translate(\" + (width / 2) + \" ,\" +\n      (5) + \")\")\n    .style(\"text-anchor\", \"middle\")\n    .text(Object(_parse__WEBPACK_IMPORTED_MODULE_0__[\"getDateString\"])(\"Yesterday\"));\n\n  svg.append(\"text\")\n    .attr(\"transform\",\n      \"translate(\" + (width / 2) + \" ,\" +\n      (height + margin.top + 30) + \")\")\n    .style(\"text-anchor\", \"middle\")\n    .text(\"time of day (24h)\");\n\n  svg.append(\"text\")\n    .attr(\"transform\", \"rotate(-90)\")\n    .attr(\"y\", 0 - margin.left)\n    .attr(\"x\", 0 - (height / 2))\n    .attr(\"dy\", \"1em\")\n    .style(\"text-anchor\", \"middle\")\n    .text(\"speed in miles per hour (mph)\");\n\n  // Update display based on drop down\n\n  function dropdownUpdate(selectedData) {\n    \n    const dataSetName = Object(_parse__WEBPACK_IMPORTED_MODULE_0__[\"getDataSetName\"])(selectedData);\n    const dataFilter = displayData[dataSetName];\n\n    comparisonDay\n      .datum(dataFilter)\n      .transition()\n      .duration(1000)\n      .attr(\"d\", d3.line()\n        .x(function (d) { return x(d.hourValue) })\n        .y(function (d) { return y(d.value) })\n      )\n  \n    comparisonPoint\n      .data(dataFilter)\n      .transition()\n      .duration(1000)\n        .attr(\"cx\", d => { return x(d.hourValue) })\n        .attr(\"cy\", d => { return y(d.value) })\n\n\n    const avgSetName = Object(_parse__WEBPACK_IMPORTED_MODULE_0__[\"getAvgSetName\"])(selectedData);\n    const avgDataFilter = displayData[avgSetName];\n\n    comparisonAvg\n      .datum(avgDataFilter)\n      .transition()\n      .duration(1000)\n      .attr(\"d\", d3.line()\n        .curve(d3.curveBasis)\n        .x(function (d) { return x(d.hourValue) })\n        .y(function (d) { return y(d.value) })\n      )\n\n    const dateString = Object(_parse__WEBPACK_IMPORTED_MODULE_0__[\"getDateString\"])(selectedData);\n\n    graphTitle\n      .text(dateString)\n\n  }\n\n  // Drop down event handler\n\n  d3.select(\"#selectButton\").on(\"change\", function(d) {\n    let selectedOption = d3.select(this).property(\"value\");\n    dropdownUpdate(selectedOption);\n  })\n\n  const checkboxData = [currentDay, currentAvg, comparisonDay, comparisonAvg];\n  \n\n  function checkboxUpdate() {\n    \n    d3.selectAll(\".checkbox\").each(function(d) {\n      let cb = d3.select(this);\n      let idx = cb.property(\"value\");\n\n      if (cb.property(\"checked\")) {\n        checkboxData[idx]\n          .transition()\n          .duration(750)\n          .style(\"opacity\", 1)\n        \n        if (idx === \"2\") {\n          svg.selectAll(\"circle\")\n            .transition()\n            .duration(750)\n            .style(\"opacity\", 1)          \n        }\n\n      } else {\n        checkboxData[idx]\n          .transition()\n          .duration(750)\n          .style(\"opacity\", 0)\n\n        if (idx === \"2\") {\n          svg.selectAll(\"circle\")\n            .transition()\n            .duration(750)\n            .style(\"opacity\", 0)\n        }  \n      }\n    })\n  }\n\n  d3.selectAll(\".checkbox\").on(\"change\", checkboxUpdate);\n  checkboxUpdate();\n\n\n  function animateComparisonAvg(idx) {\n    const dataSet = `avgDayMinus${5 - idx}`\n    const currentDisplay = displayData[dataSet]\n\n    comparisonAvg\n      .datum(currentDisplay)\n      .transition()\n      .duration(1000)\n      .attr(\"d\", d3.line()\n        .curve(d3.curveBasis)\n        .x(function (d) { return x(d.hourValue) })\n        .y(function (d) { return y(d.value) })\n      )\n\n    const displayName = Object(_parse__WEBPACK_IMPORTED_MODULE_0__[\"getDisplayNameFromAvgSetName\"])(dataSet);\n    const dateString = Object(_parse__WEBPACK_IMPORTED_MODULE_0__[\"getDateString\"])(displayName);\n    \n    graphTitle\n      .text(dateString)\n\n  }\n\n  d3.select(\"#animateButton\").on(\"click\", () => {\n    console.log(\"clicked\");\n    let i = 0;\n    let myInterval = setInterval(() => {\n      animateComparisonAvg(i);\n      i++\n      if (i === 5)  {\n        clearInterval(myInterval);\n      }\n    }, 1000);\n  });\n\n\n});\n\n\n//# sourceURL=webpack:///./lineChart.js?");

/***/ }),

/***/ "./parse.js":
/*!******************!*\
  !*** ./parse.js ***!
  \******************/
/*! exports provided: parseAllWindData, averageData, createDisplayData, getDataSetName, getAvgSetName, getDisplayNameFromAvgSetName, niceFormatDate, getDateString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"parseAllWindData\", function() { return parseAllWindData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"averageData\", function() { return averageData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createDisplayData\", function() { return createDisplayData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDataSetName\", function() { return getDataSetName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAvgSetName\", function() { return getAvgSetName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDisplayNameFromAvgSetName\", function() { return getDisplayNameFromAvgSetName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"niceFormatDate\", function() { return niceFormatDate; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getDateString\", function() { return getDateString; });\n\nconst parseAllWindData = text => {\n\n  const METERSPERSECONDCONVERTMPH = 2.23694;\n  const allWindData = [];\n  const lines = text.split(`\\n`);\n\n  for (let i = 2; i < lines.length; i++) {\n    let line = lines[i]\n    line = line.replace(/  +/g, ' '); // extra spaces in data\n    line = line.split(\" \");\n\n    const windSpeed = line[7];\n    if (windSpeed === \"\") {\n      // console.log(line);\n      // console.log(windSpeed);\n    }\n    let windDate = new Date(\n      parseInt(line[0]),      // year\n      parseInt(line[1] - 1),  // month index\n      parseInt(line[2]),      // day\n      parseInt(line[3] - 8),  // UTC hour converted to PST\n      parseInt(line[4])       // minute\n    )\n\n    allWindData.push({\n      date: windDate,\n      hourValue: windDate.getHours() + windDate.getMinutes() / 60,\n      value: parseFloat((windSpeed * METERSPERSECONDCONVERTMPH).toFixed(2))\n    });\n  }\n\n  return allWindData;\n}\n\n\nconst averageData = oneDayData => {\n  const averageData = [];\n\n  for (var i = 9; i < 18; i++) {\n    let count = 0;\n    let sum = 0;\n\n    oneDayData.forEach(ele => {\n      if (ele.hourValue >= i && ele.hourValue < i + 1) {\n        sum += ele.value;\n        count++;\n      }\n    });\n\n    if (count != 0) {\n      averageData.push({\n        hourValue: i + 0.5,\n        value: parseFloat((sum / count).toFixed(2))\n      });\n    }\n  }\n\n  return averageData;\n}\n\nconst createDisplayData = allWindData => {\n  const displayData = {};\n  const today = new Date();\n  today.setHours(today.getHours() - 8);\n\n  for (var i = 0; i <= 5; i++) {\n    let begin = new Date(\n      today.getFullYear(),\n      today.getMonth(),\n      today.getDate() - i,\n      9\n    );\n\n    let end = new Date(\n      today.getFullYear(),\n      today.getMonth(),\n      today.getDate() - i,\n      18\n    );\n\n    const oneDayData = allWindData.filter(ele => {\n      return (\n        ele.date.getTime() > begin.getTime() &&\n        ele.date.getTime() < end.getTime()\n      );\n    });\n\n    displayData[`dayMinus${i}`] = oneDayData;\n    displayData[`avgDayMinus${i}`] = averageData(oneDayData);\n  }\n\n  return displayData;\n}\n\nconst getDataSetName = displayName => {\n  const displayNameToDataName = {\n    Yesterday: \"dayMinus1\",\n    \"Two Days Ago\": \"dayMinus2\",\n    \"Three Days Ago\": \"dayMinus3\",\n    \"Four Days Ago\": \"dayMinus4\",\n    \"Five Days Ago\": \"dayMinus5\"\n  };\n\n  return displayNameToDataName[displayName];\n}\n\nconst getAvgSetName = displayName => {\n  const displayNameToAvgName = {\n    Yesterday: \"avgDayMinus1\",\n    \"Two Days Ago\": \"avgDayMinus2\",\n    \"Three Days Ago\": \"avgDayMinus3\",\n    \"Four Days Ago\": \"avgDayMinus4\",\n    \"Five Days Ago\": \"avgDayMinus5\"\n  };\n\n  return displayNameToAvgName[displayName];\n}\n\nconst getDisplayNameFromAvgSetName = avgSetName => {\n  const avgSetNameToDisplayName = {\n    avgDayMinus1: \"Yesterday\",\n    avgDayMinus2: \"Two Days Ago\",\n    avgDayMinus3: \"Three Days Ago\",\n    avgDayMinus4: \"Four Days Ago\",\n    avgDayMinus5: \"Five Days Ago\"\n  };\n\n  return avgSetNameToDisplayName[avgSetName];\n}\n\nconst niceFormatDate = jsDateObject => {\n  \n  const monthIndex = {\n    0: \"January\",\n    1: \"February\",\n    2: \"March\",\n    3: \"April\",\n    4: \"May\",\n    5: \"June\",\n    6: \"July\",\n    7: \"August\",\n    8: \"September\",\n    9: \"October\",\n    10: \"November\",\n    11: \"December\",\n  }\n\n  const month = monthIndex[jsDateObject.getMonth()];\n  const day = jsDateObject.getDate();\n  const year = jsDateObject.getFullYear();\n  return `${month} ${day}, ${year}`;\n}\n\nconst getDateString = displayName => {\n  const displayNameToDate = {};\n  const today = new Date();\n  today.setHours(today.getHours() - 8);\n  const displayNames = [\n    \"Yesterday\",\n    \"Two Days Ago\",\n    \"Three Days Ago\",\n    \"Four Days Ago\",\n    \"Five Days Ago\"\n  ];\n\n  let i = 0;\n  while (i < displayNames.length) {\n    today.setDate(today.getDate() - 1);\n    displayNameToDate[displayNames[i]] = niceFormatDate(today);\n    i++;\n  }\n\n  return displayNameToDate[displayName];\n}\n\n\n\n//# sourceURL=webpack:///./parse.js?");

/***/ })

/******/ });