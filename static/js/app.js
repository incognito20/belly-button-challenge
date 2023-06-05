// // Set variable to URL
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Set variables for samples and metadata
var samples;
var mData;

//Set JSON to data and assign values to variables and call each function for each id
d3.json(url).then(function (data) {
    let select = d3.select("#selDataset");
    samples = data.samples;
    mdata = data.metadata;
    data.names.forEach((id) => {select.append("option").text(id).property("value", id);
    });
    metaData(mdata[0]);
    horizBarChart(samples[0]);
    bubbleChart(samples[0]);
});

//When option is changed select new id and call each function again
function optionChanged(value) {
    var selectId = samples.find((item) => item.id === value);
    var demoInfo = mdata.find((item) => item.id == value);

// Calls for bar chart
    horizBarChart(selectId);

// Calls for bubble Chart
    bubbleChart(selectId);

 // Calls for demographic data
    metaData(demoInfo);
   
}
//Pulls each of the demographic items and sets each title
function metaData(demoInfo) {
    let demoSelect = d3.select("#sample-metadata");

    demoSelect.html(
    `ID: ${demoInfo.id} <br> 
    Ethnicity: ${demoInfo.ethnicity} <br>
    Gender: ${demoInfo.gender} <br>
    Age: ${demoInfo.age} <br>
    Location: ${demoInfo.location} <br>
    BBType: ${demoInfo.bbtype} <br>
    WFreq: ${demoInfo.wfreq}`
    );
}
//HBar chart. Reverses order and charts sample values and otu_ids for top 10
function horizBarChart(selectId) {
    let x = selectId.sample_values.slice(0, 10).reverse();
    let y = selectId.otu_ids
        .slice(0, 10)
        .reverse()
        .map((item) => `OTU ${item}`);
    let text = selectId.otu_labels.slice(0, 10).reverse();

    barChart = {
        x: x,
        y: y,
        text: text,
        type: "bar",
        orientation: "h",
    };

    let chart = [barChart];

    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100,
        },
        height: 500,
        width: 600,
    };

    Plotly.newPlot("bar", chart, layout);
}
//Bubble chart for otu ids and sample values.
function bubbleChart(selectId) {
    let x = selectId.otu_ids;
    let y = selectId.sample_values;
    let marker_size = selectId.sample_values;
    let color = selectId.otu_ids;
    let text = selectId.otu_labels;

    bubble = {
        x: x,
        y: y,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            colorscale: "Picnic",
            size: marker_size,
        },
        type: "scatter",
    };
    let chart = [bubble];

    let layout = {
        xaxis: {
            title: { text: "OTU ID" },
        },
    };
    Plotly.newPlot("bubble", chart, layout);
}