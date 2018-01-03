export function pickGraphs (complexArr, graphKey) {
  return complexArr.map(complex => ({
    name: complex.name,
    data: complex.graph[graphKey]
  }))
}

export function formatData (seriesArr) {
    const totalDataTime = 3600, // seconds
      totalDataPoints = seriesArr[0].data.length,
      dataInterval = totalDataTime / totalDataPoints, // seconds
      skipIntervals = 3,
      output = []

    // Iterate through seach series to build a multi series dataset
    seriesArr.forEach(series => {
      const intervalTime = new Date(),
        seriesObj = {
          name: series.name,
          data: {}
        }

      // Iterate through each series datapoint to build seriesObj
      series.data.forEach((dataPoint, i) => {
        // Updated intervalTime with computed interval length
        intervalTime.setSeconds(intervalTime.getSeconds() + dataInterval)
        // add datapoint to a key using the computed time interval
        // skip datapoints based on skipInterval
        if (i % skipIntervals === 0) seriesObj.data[intervalTime] = dataPoint
      })

      // Push compiled seriesObj to returned output
      output.push(seriesObj)
    })

    return output
}

export function lineChartBaseStyle () {
  return {
    chartArea: {
      left: 40,
      width: '80%'
    },
    colors: [
      '#f44336',
      '#9C27B0',
      '#3F51B5',
      '#03A9F4',
      '#009688',
      '#8BC34A',
      '#FFC107'
    ],
    width: '100%',
    legend: {
      position: 'right',
    },
    pointSize: 0,
    curveType: 'none',
    titleTextStyle: {
      fontName: 'Roboto',
      fontSize: 22,
      bold: false
    },
    vAxis: {
      // textPosition: 'in'
    },
    hAxis: {
      slantedText: true,
    }
  }
}
