var width = 500;
var height = 500;
var padding = 30;

var yScale = d3.scaleLinear()
    .domain(d3.extent(birthData2011, d => d.lifeExpectancy))
    .range([height - padding, padding]);

var xScale = d3.scaleLinear()
    .domain(d3.extent(birthData2011, d => d.births / d.population))
    .range([padding, width - padding]);

var xAxis = d3.axisBottom(xScale)
    .tickSize(-height + 2 * padding)
    .tickSizeOuter(0);
var yAxis = d3.axisLeft(yScale)
    .tickSize(-width + 2 * padding)
    .tickSizeOuter(0);

var colorScale = d3.scaleLinear()
    .domain(d3.extent(birthData2011, d => d.population / d.area))
    .range(['lightgreen', 'black']);

var radiusScale = d3.scaleLinear()
    .domain(d3.extent(birthData2011, d => d.births))
    .range([2, 40]);
d3.select("svg")
    .append("g")
    .call(xAxis)
    .attr("transform", "translate(0," + (height - padding) + ")");
d3.select("svg")
    .append("g")
    .call(yAxis)
    .attr("transform", "translate(" + (padding) + ",0)");
d3.select("svg")
    .attr("width", width)
    .attr("height", height)
    .selectAll("circle")
    .data(birthData2011)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.births / d.population))
    .attr("cy", d => yScale(d.lifeExpectancy))
    .attr("fill", d => colorScale(d.population / d.area))
    .attr("r", d => radiusScale(d.births));


d3.select('svg')
    .append("text")
    .attr("x", width / 2)
    .attr("y", (height - 5))
    .attr("text-anchor", "middle")
    .attr("dy", "1.5 rem")
    .text("Birth per capita");
d3.select('svg')
    .append("text")
    .attr("x", width / 2)
    .attr("y", (padding))
    .attr("text-anchor", "middle")
    .attr("dy", "1.5 rem")
    .text("Data on birth of every country");
d3.select('svg')
    .append("text")
    .attr('transform', 'rotate(-90)')
    .attr("x", -height / 2)
    .attr("y", 10)
    .attr("text-anchor", "middle")
    .attr("dy", "1.1 rem")
    .text("Life expectancy");