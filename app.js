// Initialize array variables
var groupNames
var groupMetadata
var groupSamples
// Use d3.json() to fetch data from JSON file
d3.json("data/samples.json").then((data) => {
    groupNames = data.names
    groupMetadata = data.metadata
    groupSamples = data.samples
    // Displays the currect selection in the dropdownlist
    d3.select("#selDataset")
      .selectAll("myOptions")
     	.data(groupNames)
      .enter()
    	.append('option')
        // text showed in the menu
      .text(function (d) { return d; })
      // corresponding value returned by the button
      .attr("value", function (d) { return d; })


    // Default metadata for the first option on the list
    var defaultId = document.getElementById("selDataset").value;
    var defaultSlice = groupMetadata[groupNames.indexOf(defaultId)];
    idMatch = defaultId;
    ethMatch = defaultSlice["ethnicity"];
    genderMatch = defaultSlice["gender"];
    ageMatch = defaultSlice["age"];
    locMatch = defaultSlice["location"];
    bbMatch = defaultSlice["bbtype"];
    freqMatch = defaultSlice["wfreq"];
    // Enter data into text box
    let ele = document.getElementById("sample-metadata");
    ele.innerHTML += "id: " + idMatch + "<br />";
    ele.innerHTML += "ethnicity: " + ethMatch + "<br />";
    ele.innerHTML += "gender: " + genderMatch + "<br />";
    ele.innerHTML += "age: " + ageMatch + "<br />";
    ele.innerHTML += "location: " + locMatch + "<br />";
    ele.innerHTML += "bbtype: " + bbMatch + "<br />";
    ele.innerHTML += "wfreq: " + freqMatch;


    // Plot for default option

    // Bar plot
    // Create the Traces
    var defaultSample = groupSamples[groupNames.indexOf(defaultId)];
    var ylabels = []
    defaultSample["otu_ids"].slice(0, 10).reverse().map(String).forEach(function (item) {
        ylabels.push("OTU "+item);
    });
    var trace1 = {
    x: defaultSample["sample_values"].slice(0, 10).reverse(),
    y: ylabels,
    text: defaultSample["otu_labels"].slice(0, 10).reverse(),
    title: "Top 10 Bacteria Cultures Found",
    name: "Bacteria Samples",
    type: "bar",
    orientation: "h",
    };

    // Create the data array for the plot
    var chartData = [trace1];

    // Define the plot layout
    var layout = {
        title: "Top 10 Bacteria Cultures Found",
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", chartData, layout);


    // Default bubble plot
    var trace2 = {
        x: defaultSample["otu_ids"].map(String),
        y: defaultSample["sample_values"],
        text: defaultSample["otu_labels"],
        title: "Bacteria Cultures Per Sample",
        mode: 'markers',
        marker: {
            color: defaultSample["otu_ids"].map(String),
            size: defaultSample["sample_values"]
        }
    };
    
    // Create data array for plot
    var bubbleData = [trace2];
    
    // Define plot layout
    var layout2 = {
        showlegend: false,
        xaxis:{"title": "OTU ID"}
    };
    
    // Plot the chart to a div tag with id "bubble"
    Plotly.newPlot("bubble", bubbleData, layout2);

    // Gauge
    var gaugeData = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: freqMatch,
            title: "<b>Belly Button Washing Frequency</b><br />Scrubs Per Week",
            type: "indicator",
            mode: "gauge",
        gauge: {
            axis: { range: [null, 9], tickmode: "linear" },
            steps: [
                { range: [0, 1], color: "#EBF3F5" },
                { range: [1, 2], color: "#D5E7EA" },
                { range: [2, 3], color: "#C3E4EA" },
                { range: [3, 4], color: "#A0D8E1" },
                { range: [4, 5], color: "#8BD1DC" },
                { range: [5, 6], color: "#71C5D3" },
                { range: [6, 7], color: "#59BBCB" },
                { range: [7, 8], color: "#45B0C1" },
                { range: [8, 9], color: "#269CAF" }
            ],
            threshold: {
                line: { color: "purple", width: 8 },
                thickness: 0.75,
                value: freqMatch
            }
        }
    }];

    var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', gaugeData, layout3);

        });


// Function for when an option is selected in the dropdownlist
// Updates all information on page
function optionChanged(boxId) {
    // Delete text in box to create new text
    document.getElementById("sample-metadata").innerHTML = "";
    // Get index of selected option and use it to get metadeta dictionary
    var index = groupNames.indexOf(boxId);
    var metaSlice = groupMetadata[index];
    // Get values of data from dictionary
    idMatch = metaSlice["id"];
    ethMatch = metaSlice["ethnicity"];
    genderMatch = metaSlice["gender"];
    ageMatch = metaSlice["age"];
    locMatch = metaSlice["location"];
    bbMatch = metaSlice["bbtype"];
    freqMatch = metaSlice["wfreq"];
    // Enter data into text box
    let ele = document.getElementById("sample-metadata");
    ele.innerHTML += "id: " + idMatch + "<br />";
    ele.innerHTML += "ethnicity: " + ethMatch + "<br />";
    ele.innerHTML += "gender: " + genderMatch + "<br />";
    ele.innerHTML += "age: " + ageMatch + "<br />";
    ele.innerHTML += "location: " + locMatch + "<br />";
    ele.innerHTML += "bbtype: " + bbMatch + "<br />";
    ele.innerHTML += "wfreq: " + freqMatch;

    // Update bar plot with new ID
    // Create the Traces
    var sample = groupSamples[index];
    var ylabels = []
    sample["otu_ids"].slice(0, 10).reverse().map(String).forEach(function (item) {
        ylabels.push("OTU "+item);
    });
    var trace1 = {
        x: sample["sample_values"].slice(0, 10).reverse(),
        y: ylabels,
        text: sample["otu_labels"].slice(0, 10).reverse(),
        title: "Top 10 Bacteria Cultures Found",
        name: "Bacteria Samples",
        type: "bar",
        orientation: "h",
    };

    // Create the data array for the plot
    var chartData = [trace1];

    // Define the plot layout
    var layout = {
        title: "Top 10 Bacteria Cultures Found",
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", chartData, layout);


    // Bubble plot
    var trace2 = {
        x: sample["otu_ids"].map(String),
        y: sample["sample_values"],
        text: sample["otu_labels"],
        title: "Bacteria Cultures Per Sample",
        mode: 'markers',
        marker: {
            color: sample["otu_ids"].map(String),
            size: sample["sample_values"]
        }
    };
    
    // Create data array for plot
    var bubbleData = [trace2];
    
    // Define plot layout
    var layout2 = {
        showlegend: false,
        xaxis:{"title": "OTU ID"}
    };
    
    // Plot the chart to a div tag with id "bubble"
    Plotly.newPlot("bubble", bubbleData, layout2);


    // Gauge
    var gaugeData = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: freqMatch,
        title: "<b>Belly Button Washing Frequency</b><br />Scrubs Per Week",
        type: "indicator",
        mode: "gauge",
        gauge: {
            axis: { range: [null, 9], tickmode: "linear" },
            steps: [
                { range: [0, 1], color: "#EBF3F5" },
                { range: [1, 2], color: "#D5E7EA" },
                { range: [2, 3], color: "#C3E4EA" },
                { range: [3, 4], color: "#A0D8E1" },
                { range: [4, 5], color: "#8BD1DC" },
                { range: [5, 6], color: "#71C5D3" },
                { range: [6, 7], color: "#59BBCB" },
                { range: [7, 8], color: "#45B0C1" },
                { range: [8, 9], color: "#269CAF" }
            ],
            threshold: {
                line: { color: "purple", width: 8 },
                thickness: 0.75,
                value: freqMatch
            }
        }
    }];

    var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', gaugeData, layout3);

};