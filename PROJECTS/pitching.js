//set descriptive variable names for dropdown
let longVars = 
{
    Team: 'Team',
    Level: 'Level',
    Season: 'Season',
    Age: 'Age',
    IP: 'IP',
    K9: 'K/9', 
    BB9: 'BB/9',
    KBB: 'K/9-BB/9',
    HR9: 'HR/9',
    Kp: 'K%',
    BBp: 'BB%',
    KBBp: 'K-BB%',
    AVG: 'AVG',
    WHIP: 'WHIP',
    BABIP: "BABIP",
    LOBp: 'LOB%',
    ERA: 'ERA',
    FIP: 'FIP',
    EF: 'ERA-FIP',
    xFIP: 'xFIP'
}

//set the dimensions and margins of the graph
const margin = {top: 30, right: 0, bottom: 30, left: 150},
  width = 1000 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

//append the svg object to the body of the page
const svg = d3.select("#pitchers-heatmap")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//load data
d3.csv('pitchers_groupby_team.csv', cleanup_data)
    .then(d => 
    {
        //initialize plot
        setup(d)
        //update when variable changes
        update(d)
    })
    .catch(error => console.log(error))

//return data
function cleanup_data(d) 
{
    return d
}

//initialize plot (data)
function setup(data) 
{
    //format select box
    let variables = Object.keys(data[0]).filter(d => d != 'Team' && d != 'Level' && d != 'Season' && d != 'Age' && d != 'IP')
    // populate selectors
    d3.select('select.fill')
      .on('change', () => update(data))
      .selectAll('option')
      .data(variables)
      .enter()
      .append('option')
      .attr('value', d => d)
      .text(d => longVars[d])

    //setup xvals - mlb organizations
    const xvals = Array.from(new Set(data.map(d => d.Team)))
    //setup yvals - milb leagues/levels
    const yvals = ['AAA','AA','A+','A','CPX','DSL'].reverse()

    //build x scale and axis
    const x = d3.scaleBand()
    .range([ 0, width ])
    .domain(xvals)
    .padding(0.15);
    svg.append("g")
    .style("font-size", 10)
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

    //build y scale and axis
    const y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(yvals)
    .padding(0.05);
    svg.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

    //create color scale
    //initialize using xFIP, [max,min]
    //use the magma scale
    let min = d3.min(data, function(d) { return +d['xFIP']; })
    let max = d3.max(data, function(d) { return +d['xFIP']; })
    let myColor = d3.scaleSequential()
    .domain([max,min])
    .interpolator(d3.interpolateMagma);

    //create a tooltip
    const tooltip = d3.select("#pitchers-heatmap")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

    //functions that change the tooltip when user hovers / moves / leaves a cell
    const mouseover = function(event,d) {
    tooltip
        .style("opacity", 1)
    d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }
    const mousemove = function(event,d) {
    tooltip
        .html("The average xFIP for " + d.Level + " pitchers in the " + d.Team + " organization is: " + d['xFIP'])
        .style("left", (event.x)/2 + "px")
        .style("top", (event.y)/2 + "px")
    }
    const mouseleave = function(event,d) {
    tooltip
        .style("opacity", 0)
    d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }

    //add the squares
    svg.selectAll()
    .data(data, function(d) {return d.Team+':'+d.Level;})
    .join("rect")
        .attr("x", function(d) { return x(d.Team) })
        .attr("y", function(d) { return y(d.Level) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return myColor(d['xFIP'])} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
}

//update plot when variables change
function update(data)
{
    //the heatmap will be filled based on the property selected in dropdown
    let fill = d3.select('select.fill').property('value')

    //set xvals, yvals
    const xvals = Array.from(new Set(data.map(d => d.Team)))
    const yvals = ['AAA','AA','A+','A','CPX','DSL'].reverse()

    //build x scale and axis
    const x = d3.scaleBand()
    .range([ 0, width ])
    .domain(xvals)
    .padding(0.15);
    svg.append("g")
    .style("font-size", 10)
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickSize(0))
    .select(".domain").remove()

    //build y scale and axis
    const y = d3.scaleBand()
    .range([ height, 0 ])
    .domain(yvals)
    .padding(0.05);
    svg.append("g")
    .style("font-size", 15)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain").remove()

    //set min and max values for color scale
    //based on variable
    let min = d3.min(data, function(d) { return +d[fill]; })
    let max = d3.max(data, function(d) { return +d[fill]; })

    //set order of colors
    var fillA = null
    if(fill == 'K9' || fill == 'KBB' || fill == 'Kp')
    {
        fillA = [min,max]
    }
    else { fillA = [max,min] }

    //fill heatmap using color scale based on variable
    let myColor = d3.scaleSequential()
    .domain(fillA)
    .interpolator(d3.interpolateMagma);

    //create a tooltip
    const tooltip = d3.select("#tooltip")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

    //functions that change the tooltip when user hovers / moves / leaves a cell
    const mouseover = function(event,d) {
    tooltip
        .style("opacity", 1)
    d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    }
    const mousemove = function(event,d) {
    tooltip
        .html("The average " + longVars[fill] + " for " + d.Level + " pitchers in the " + d.Team + " organization is: " + d[fill])
        .style("left", (event.x)/2 + "px")
        .style("top", (event.y)/2 + "px")
    }
    const mouseleave = function(event,d) {
    tooltip
        .style("opacity", 0)
    d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    }

    //add the squares
    svg.selectAll()
    .data(data, function(d) {return d.Team+':'+d.Level;})
    .join("rect")
        .attr("x", function(d) { return x(d.Team) })
        .attr("y", function(d) { return y(d.Level) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return myColor(d[fill])} )
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
}