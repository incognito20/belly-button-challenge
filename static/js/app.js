//Set url variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the json data
d3.json(url).then(function(data) {
  console.log(data);


  // Sort the data 
  let sortData = data.sort((a, b) => b.values - a.values);

  //Slice data for top 10
  let sliceData = sortData.slice(0, 10);

  //Reverse order
  let reverseData = sliceData.reverse();


  // Create trace for the horizontal bar chart
  let trace = {
    x: reverseData.map(Object => Object.values),
    y: reverseData.map(Object => `OTU ${Object.otu_ids}`),
    text: reversedData.map(Object => Object.otu_labels),
    name: "Top 10 OTU's",
    type: "bar",
    orientation: "h"
  };

  // Data for the chart
  let traceData = [trace];

  // Layout for the chart
  let layout = {
    title: "Top 10 OTUs",
    margin: {
      l: 125,
      r: 125,
      t: 125,
      b: 125
    }
  };

  // Draw chart
  Plotly.newPlot("bar", traceData, layout);

  });
