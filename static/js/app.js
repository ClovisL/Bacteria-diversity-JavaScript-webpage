// Use d3.json() to fetch data from JSON file
d3.json("data/data.json").then((data) => {
    let selector = d3.select("#selDataset");
    let sampleNames = data.map(ele => ele.names);
            
    sampleNames.forEach((sample) => {
        selector
            .append("option")
            .text(sample)
            .property("value", sample);
    });
});