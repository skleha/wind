
function parseAllWindData(text) {

  const METERSPERSECONDCONVERTMPH = 2.23694;
  const allWindData = [];
  const lines = text.split(`\n`);

  for (let i = 2; i < lines.length; i++) {
    let line = lines[i]
    line = line.replace(/  +/g, ' '); // extra spaces in data
    line = line.split(" ");

    let windDate = new Date(
      parseInt(line[0]),      // year
      parseInt(line[1] - 1),  // month index
      parseInt(line[2]),      // day
      parseInt(line[3] - 8),  // UTC hour converted to PST
      parseInt(line[4])       // minute
    )

    const hourDecimal = windDate.getHours() + windDate.getMinutes() / 60;
    const windSpeed = parseFloat((line[7] * METERSPERSECONDCONVERTMPH).toFixed(2))

    if (!(hourDecimal && windSpeed)) {
      continue;
    }

    allWindData.push({
      date: windDate,
      hourValue: hourDecimal,
      value: windSpeed,
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
      if (ele.hourValue >= i && ele.hourValue < i + 1) {
        sum += ele.value;
        count++;
      }
    });

    if (count != 0) {
      averageData.push({
        hourValue: i + 0.5,
        value: parseFloat((sum / count).toFixed(2))
      });
    }
  }

  return averageData;
}


function filterAllWindByHour(allWindData) {
  const filteredWindData = allWindData.filter(ele => {
    const eleHour = ele.date.getHours();
    return eleHour > 7 && eleHour < 19
  })

  return filteredWindData;
}


function createDisplayData(allWindData) {
  const displayData = {};
  displayData["allWindData"] = filterAllWindByHour(allWindData);

  const today = new Date();
  today.setHours(today.getHours() - 8);

  for (var i = 0; i <= 5; i++) {
    let begin = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - i,
      9
    );

    let end = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - i,
      18
    );

    const oneDayData = allWindData.filter(ele => {
      return (
        ele.date.getTime() > begin.getTime() &&
        ele.date.getTime() < end.getTime()
      );
    });

    displayData[`dayMinus${i}`] = oneDayData;
    displayData[`avgDayMinus${i}`] = averageData(oneDayData);
  }

  return displayData;
}

function getDataSetName(displayName) {
  const displayNameToDataName = {
    Yesterday: "dayMinus1",
    "Two Days Ago": "dayMinus2",
    "Three Days Ago": "dayMinus3",
    "Four Days Ago": "dayMinus4",
    "Five Days Ago": "dayMinus5"
  };

  return displayNameToDataName[displayName];
}

function getAvgSetName(displayName) {
  const displayNameToAvgName = {
    Yesterday: "avgDayMinus1",
    "Two Days Ago": "avgDayMinus2",
    "Three Days Ago": "avgDayMinus3",
    "Four Days Ago": "avgDayMinus4",
    "Five Days Ago": "avgDayMinus5"
  };

  return displayNameToAvgName[displayName];
}

function getDisplayNameFromAvgSetName(avgSetName) {
  const avgSetNameToDisplayName = {
    avgDayMinus1: "Yesterday",
    avgDayMinus2: "Two Days Ago",
    avgDayMinus3: "Three Days Ago",
    avgDayMinus4: "Four Days Ago",
    avgDayMinus5: "Five Days Ago"
  };

  return avgSetNameToDisplayName[avgSetName];
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

  let i = 0;
  while (i < displayNames.length) {
    today.setDate(today.getDate() - 1);
    displayNameToDate[displayNames[i]] = niceFormatDate(today);
    i++;
  }

  return displayNameToDate[displayName];
}

