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

    // Create the Traces
    var defaultSample = groupSamples[groupNames.indexOf(defaultId)];
    var trace1 = {
    x: defaultSample["sample_values"].slice(0, 10).reverse(),
    y: "OTU " + defaultSample["otu_ids"].slice(0, 10).reverse(),
    text: defaultSample["otu_labels"].slice(0, 10).reverse(),
    name: "Bacteria Samples",
    type: "bar",
    orientation: "h",
    };

    // Create the data array for the plot
    var chartData = [trace1];

    // Define the plot layout
    var layout = {
    title: "Top 10 Bacteria Cultures Found",
    margin: {
        l: 250,
        r: 250,
        t: 50,
        b: 50
    }
    };

    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("bar", chartData, layout);

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
};