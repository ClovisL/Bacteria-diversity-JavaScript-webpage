// Use d3.json() to fetch data from JSON file
d3.json("data/samples.json").then((data) => {
    var groupNames = data.names
    d3.select("#selDataset")
      .selectAll("myOptions")
     	.data(groupNames)
      .enter()
    	.append('option')
        // text showed in the menu
      .text(function (d) { return d; })
      // corresponding value returned by the button
      .attr("value", function (d) { return d; })

    // A function that update the chart
    function update(selectedGroup) {

        // Create new data with the selection?
        var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })
  
        // Give these new data to update line
        line
            .datum(dataFilter)
            .transition()
            .duration(1000)
            .attr("d", d3.line()
              .x(function(d) { return x(+d.time) })
              .y(function(d) { return y(+d.value) })
            )}
    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)

        // Enter metadata by matching id
        idMatch = data.metadata.filter(g => data.names.includes(g.id)).map(g => g.id)
        ethMatch = data.metadata.filter(g => data.names.includes(g.id)).map(g => g.ethnicity)
        genderMatch = data.metadata.filter(g => data.names.includes(g.id)).map(g => g.gender)
        ageMatch = data.metadata.filter(g => data.names.includes(g.id)).map(g => g.age)
        locMatch = data.metadata.filter(g => data.names.includes(g.id)).map(g => g.location)
        bbMatch = data.metadata.filter(g => data.names.includes(g.id)).map(g => g.bbtype)
        freqMatch = data.metadata.filter(g => data.names.includes(g.id)).map(g => g.wfreq)
        
        let ele = document.getElementById("sample-metadata");
        ele.innerHTML += "id: " + idMatch + "<br />";
        ele.innerHTML += "ethnicity: " + ethMatch + "<br />";
        ele.innerHTML += "gender: " + genderMatch + "<br />";
        ele.innerHTML += "age: " + ageMatch + "<br />";
        ele.innerHTML += "location: " + locMatch + "<br />";
        ele.innerHTML += "bbtype: " + bbMatch + "<br />";
        ele.innerHTML += "wfreq: " + freqMatch;
    })


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