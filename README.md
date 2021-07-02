# Diversity of Bacteria in Bellybuttons
An HTML webpage was made to place charts and data that was parsed using JavaScript.

A samples.json dataset was read using D3, and all arrays and dictionaries in those arrays were parsed and saved to variables.

The dropdownlist in the HTML file was populated with all IDs of subjects from the dataset, using JavaScript code to select them. Upon selection, a function is run that updates all data and charts on the webpage according to the selected ID.
The webpage is first initialized with data and charts according to the first selection in the dropdownlist.

The metadata box gets it's information by taking the current ID selection, obtaining it's index location, and using that index in the "metadata" array to grab the dictionary that contains all relevant information. This information is then taken by getting the dictionary values of keywords. Those key:value pairs are then passed into a div panel in the webpage to be printed out.

A horizontal bar graph is made using sample_values for the x axis, otu_ids for the y axis, and otu_labels for hovertext. The top 10 samples found in the subject are taken by using the .slice(0, 10) function on the arrays for otu_ids, sample_values, and otu_labels, and .reverse() to make them ordered from highest to lowest.

A bubble graph is made with otu_ids on the x axis, sample_values on the y axis, and otu_labels for text. The chart uses different colors for the bubbles based on otu_ids, and size is dependent on sample_values.

A gauge for wash frequency is made using wfreq as the value, and the gauge was created to go from a range of 0 to 9, with steps of 1, each step having a different shade of color. A threshold line was also added with the value of wfreq, so the line is placed on the end of the gauge line.
