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
    x: data.samples.otu_ids,
    y: data.samples.sample_values,
    type: "bar",
    orientation: "h",
    name: data.samples.otu_labels,
  };

  // Create the data array for the plot
  var data = [trace1];

  // Define the plot layout
  var layout = {
    title: "Top 10 Bacteria Cultures Found",
  };

  // Plot the chart to a div tag with id "plot"
  Plotly.newPlot("plot", data, layout);
});