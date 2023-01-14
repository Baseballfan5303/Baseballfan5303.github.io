//how long transitions last (msec)
let transitionTime = 1000

//convert variables into good dropdown option descriptions
let longVars = 
{
    Name: 'Name',
    Team: 'Team',
    Level: 'Level',
    Age: 'Age',
    PA: 'Plate Appearances',
    BB: 'Walk %',
    K: 'Strikeout %',
    BBK: 'Walk-Strikeout Ratio',
    AVG: 'Average',
    OBP: 'On-Base %',
    SLG: 'Slugging %',
    OPS: 'OPS',
    ISO: 'ISO',
    Spd: 'Speed',
    BABIP: 'Batting Avg. on Balls in Play',
    wSB: 'wSB',
    wRC1: 'wRC',
    wRAA: 'wRAA',
    wOBA: 'wOBA',
    wRC2: 'wRC+',
    PlayerId: 'PlayerId'
}

//GLOBAL VARIABLES FOR FILTERING
globalAge = 0
globalPA = 0

//set margins for inner plotting region
//set outer region for axes and labels
let outerWidth = 600
let outerHeight = 400
let margins = { top: 30, bottom: 50, left: 50, right: 30 }
let innerWidth = outerWidth - margins.left - margins.right
let innerHeight = outerHeight - margins.top - margins.bottom

let scatterOuter = d3
  .select('svg#batters-scatter')
  .attr('width', outerWidth)
  .attr('height', outerHeight)

let scatterInner = scatterOuter
  .append('g')
  .attr('id', 'inner-batters')
  .attr('width', innerWidth)
  .attr('height', innerHeight)
  .attr('transform', 'translate(' + margins.left + ',' + margins.right + ')')

//load in data
d3.csv('batting.csv', cleanup_data)
    .then(d => 
    {
      //initialize
      setup(d)
      //update when variables change
      update(d)
    })
    .catch(error => console.log(error))

//convert numerical columns from string to number
function cleanup_data(data) 
{
    for (k of Object.keys(data)) 
    {
      // NB: of, no in
      if (k != 'Age' || 'PA' ||'BB' || 'K' || 'BBK' || 'AVG' || 'OBP' || 'SLG' || 'OPS' || 'ISO' || 'Spd' || 'BABIP' || 'wSB' || 'wRC' || 'wRAA' || 'wOBA' || 'wRC') data[k] = +data[k]
    }
    return data
}

//set global variables used for updating plot
let filtered = []
let xScale, yScale
let xAxis, yAxis

//setup() is for initializing plot elements
function setup(data) {

    // select only statistical variables
    let variables = Object.keys(data[0]).filter(d => d != 'PlayerId' && d != 'Name' && d != 'Team' && d != 'Level')
  
    //border around plotting region
    scatterInner
      .append('rect')
      .attr('width', innerWidth)
      .attr('height', innerHeight)
      .attr('fill', 'transparent')
      .attr('stroke', 'black')
  
    //populate dropdowns
    d3.select('select.xvar')
      .on('change', () => update(data))
      .selectAll('option')
      .data(variables)
      .enter()
      .append('option')
      .attr('value', d => d)
      .text(d => longVars[d])
  
    d3.select('select.yvar')
      .on('change', () => update(data))
      .selectAll('option')
      .data(variables)
      .enter()
      .append('option')
      .attr('value', d => d)
      .text(d => longVars[d])
  
    //initialize values of select elements
    d3.select('select.xvar').property('value', 'BABIP')
    d3.select('select.yvar').property('value', 'wRC2')
  
    // read current selections
    let xvar = d3.select('select.xvar').property('value')
    let yvar = d3.select('select.yvar').property('value')
  
    // create scales based on selections
    // the domain will be modified when selections change
    xScale = d3
      .scaleLinear()
      .domain(d3.extent(data.map(d => d[xvar]))) // get x variable from <select>
      .range([20, innerWidth - 20])
    xAxis = d3.axisBottom(xScale).tickSize(-innerHeight)
  
    yScale = d3
      .scaleLinear()
      .domain(d3.extent(data.map(d => d[yvar]))) // get y variable from <select>
      .range([20, innerHeight - 20].reverse())
    yAxis = d3.axisLeft(yScale).tickSize(-innerWidth)
  
    // create axes
    scatterInner
      .append('g')
      .attr('transform', 'translate(' + 0 + ', ' + innerHeight + ')')
      .attr('class', 'x axis')
      .call(xAxis)
  
    scatterInner
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
  
    scatterOuter
      .append('text')
      .attr('class', 'x axis')
      .attr('x', margins.left + innerWidth / 2)
      .attr('y', outerHeight - margins.bottom / 2)
      .attr('text-anchor', 'middle')
      .text(longVars[xvar])
  
    scatterOuter
      .append('text')
      .attr('class', 'y axis')
      .attr('x', margins.left / 2)
      .attr('y', margins.bottom + innerHeight / 2)
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        `rotate(-90 ${margins.left / 2} ${margins.bottom + innerHeight / 2})`
      )
      .text(longVars[yvar])
}

//update elements that get modified when selections change
function update(data) {

    //Use filters
    filtered = data.filter(function(d){ return d.Age >= globalAge && d['PA'] >= globalPA })

    //set vars
    let xvar = d3.select('select.xvar').property('value')
    let yvar = d3.select('select.yvar').property('value')
  
    //update scales
    xScale.domain([0, d3.max(data.map(d => d[xvar]))])
    yScale.domain([0, d3.max(data.map(d => d[yvar]))])
  
    //update axes
    scatterInner
      .select('.x.axis')
      .transition()
      .duration(transitionTime)
      .call(xAxis)
    scatterInner
      .select('.y.axis')
      .transition()
      .duration(transitionTime)
      .call(yAxis)

    //main plot
    scatterInner
      .selectAll('circle')
      .data(filtered)
      .join(
        enter =>
          enter
            .append('circle')
            .attr('cx', d => xScale(d[xvar]))
            .attr('cy', d => yScale(d[yvar]))
            .style("fill", "#69b3a2")
            .style('stroke-width', 1)
            .attr('r', 5)
            .style('stroke', "#000000")
            .style('opacity', 1),
        update =>
          update
            .transition()
            .duration(transitionTime)
            .attr('cx', d => xScale(d[xvar]))
            .attr('cy', d => yScale(d[yvar])),
        exit =>
          exit
            .transition()
            .duration(transitionTime)
            .remove()
      )
  
    //axis labels
    scatterOuter
      .selectAll('text.y.axis') // select text elements with two both classes
      .transition()
      .duration(transitionTime)
      .text(longVars[yvar])
  
    scatterOuter
      .selectAll('text.x.axis')
      .transition()
      .duration(transitionTime)
      .text(longVars[xvar])
}

//filter age
d3.select("#age").on("change", function(d){
  globalAge = this.value
  d3.select('#age-v').text(globalAge);
})

//filter plate appearances
d3.select("#pa").on("change", function(d){
  globalPA = this.value
  d3.select('#pa-v').text(globalPA);
})