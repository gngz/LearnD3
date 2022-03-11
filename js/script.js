d3.selectAll("h1").style("color", "#F06543");
d3.selectAll("h2").style("color", "#F06543");
d3.select("body").style("background-color", "#E8E9EB");
d3.select("body").style("color", "#313638");
d3.select("html").style("margin", "0 20px");

let data = [
    {lang: "js", "score": 60},
    {lang: "ts", "score": 90.9},
    {lang: "dart", "score": 90},
    {lang: "kotlin", "score": 80},
    {lang: "go", "score": 80},
    {lang: "rust", "score": 80},
    {lang: "python", "score": 20},
];

const dataDiv = d3
.select(".data")
.selectAll('p')
.data(data)
.enter()
.append('p')
.text(d => `${d.lang}: ${d.score} points.`);


const margin = 40;
const width = 600 ;
const height = 400;

const svg = d3.select('svg')
    .attr("width", width)
    .attr("height", height);

const graph = svg.append('g')
    .attr("width", width - margin)
    .attr("height", height - margin)
    .attr('transform', `translate(${margin}, ${margin})`);




function drawGraph(data) {

    graph.selectAll("*").remove();

    const x = d3.scaleBand()
    .range([ 0, width - margin*2])
    .domain(data.map(function(d) { return d.lang; }))
    .padding('0.4');

    graph.append('g')
    .attr('transform', `translate(0, ${height - 2* margin})`)
    .call(d3.axisBottom(x));

    const y = d3.scaleLinear()
    .domain([0,100])
    .range([height - margin *2, 0])
    
    graph.append("g")
    .call(d3.axisLeft(y));
    
    graph.selectAll("mybar")
      .data(data)
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.lang); })
        .attr("y", function(d) { return y(d.score); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - 2*margin - y(d.score); })
        .attr("fill", "#F06543")
    
    
}

drawGraph(data);