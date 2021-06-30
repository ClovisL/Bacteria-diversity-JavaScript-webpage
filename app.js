// Use d3.json() to fetch data from JSON file
d3.json("data/samples.json").then((data) => {
    let selector = d3.select("#selDataset");
    let sampleNames = data.map(ele => ele.names);
            
    sampleNames.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
    });

    //  Create the Traces
  var trace1 = {
    x: data.map(row => row.sample.otu_ids),
    y: data.map(row => row.sample.sample_values),
    text: data.map(row => row.samples.otu_labels),
    type: "bar",
    orientation: "h",
    name: data.samples.otu_labels,
  };

  // Create the data array for the plot
  var chartData = [trace1];

  // Define the plot layout
  var layout = {
    title: "Top 10 Bacteria Cultures Found",
    margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
    }
  };

  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot", chartData, layout);
});