// set the url to variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

var sampleData;
//Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  sampleData = data.sample_values;
  console.log(data);
   });

let sortedSampleData = sampleData.sort((a, b) => b.sample_values - a.sample_values);
let slicedSampleData = sortedSampleData.slice(0, 10);
let reversedSampleData = slicedSampleData.reverse();

let trace = {
        x: reversedSampleData.map(object => object.sample_values),
        y: reversedSampleData.map(object => object.otu_ids),
        text: reversedSampleData.map(object => object.otu_ids),
        type: "bar",
        orientation: "h",
        marker: {
            color: "blue"
        }
    };

    let layout = {
        height: 400,
        width: 500,
        margin: {
            t: 10
        }
    };

    let traceData = [trace];
    
    Plotly.newPlot("bar", traceData, layout);
