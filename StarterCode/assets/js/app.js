// @TODO: YOUR CODE HERE!
var svgHeight = 500
var svgWidth = 960

var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 50
}

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

filePath = "assets/data/data.csv"

d3.csv(filePath).then(function(stateData) {

console.log(stateData)

    stateData.forEach(function(data) {
        data.income = +data.income;
        data.obesity = +data.obesity;
      });

    var xLinearScale = d3.scaleLinear()
      .domain([37000, d3.max(stateData, data => data.income)])
      .range([0, width]);
  
    var yLinearScale = d3.scaleLinear()
      .domain([20, d3.max(stateData, data => data.obesity)])
      .range([height, 0]);
  
    var bottomAxis = d3.axisBottom(xLinearScale).ticks(7);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);

    chartGroup.append("g").call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", data => xLinearScale(data.income))
    .attr("cy", data => yLinearScale(data.obesity))
    .attr("r", "10")
    .attr("fill", "#89bdd3")
    .attr("opacity", ".75")

    var circlesGroup = chartGroup.selectAll()
    .data(stateData)
    .enter()
    .append("text")
    .attr("x", data => xLinearScale(data.income))
    .attr("y", data => yLinearScale(data.obesity))
    .style("font-size", "10px")
    .style("text-anchor", "middle")
    .style('fill', 'white')
    .text(data => (data.abbr));

    chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 25})`)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .text("Income")

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - (height / 2))
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("fill", "black")
    .text("Obesity")

});
