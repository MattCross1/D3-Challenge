//svg dimensions and margins
var svgWidth = 950;
var svgHeight = 650;
var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};
//chart dimension
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//svg wrapper appends to the scatter row
var svg = d3.select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

// pulling data and selecting chart parameters
d3.csv("data.csv").then (function(data) {
  console.log(data)
    data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;  
});
//adding linear scales to the axis'
  var xLinearScale = d3.scaleLinear().range([0, width]);
  var yLinearScale = d3.scaleLinear().range([height, 0]);
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  var xMin = d3.min(data, function(data) {
    return data.healthcare;
  });
  var xMax = d3.max(data, function(data) {
    return data.healthcare;
  });
  var yMin = d3.min(data, function(data) {
    return data.poverty;
  });
  var yMax = d3.max(data, function(data) {
    return data.poverty;
  });
  xLinearScale.domain([xMin, xMax]);
  yLinearScale.domain([yMin, yMax]);

  //Adding the axis'
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);

//creating and appending the circles to the chart
  var circlesGroup = chartGroup.selectAll(".stateCircle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.healthcare +1.5))
    .attr("cy", d => yLinearScale(d.poverty +0.3))
    .attr("class", "stateCircle")
    .attr("r", "15")
    .attr("fill", "CornflowerBlue")

    // adding the state abbreviations to the chart
  var textGroup = chartGroup.selectAll(".stateText")
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.healthcare +1.5))
    .attr("y", d => yLinearScale(d.poverty +0.3))
    .text(d => (d.abbr))
    .attr("class", "stateText")
    .attr("font-size", "12px")
    .attr("text-anchor", "middle")
   .attr("fill", "white");

// adding the x and y labels to the chart
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healtcare(%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");
});
