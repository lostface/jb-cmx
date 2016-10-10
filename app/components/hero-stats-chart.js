import * as React from 'react';
import * as d3 from 'd3-shape';

const ARC_COLORS = ['#1f77b4', '#ff7f0e', '#9467bd', '#2ca02c'];
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = CANVAS_WIDTH;

export default React.createClass({
  propTypes: {
    hero: React.PropTypes.shape({
      id: React.PropTypes.number,
      comics: React.PropTypes.shape({
        available: React.PropTypes.number.isRequired
      }),
      stories: React.PropTypes.shape({
        available: React.PropTypes.number.isRequired
      }),
      events: React.PropTypes.shape({
        available: React.PropTypes.number.isRequired
      }),
      series: React.PropTypes.shape({
        available: React.PropTypes.number.isRequired
      }),
    })
  },

  getDefaultProps() {
    return {
      id: -1,
      comics: { available: 0 },
      stories: { available: 0 },
      events: { available: 0 },
      series: { available: 0 },
    };
  },

  render() {
    return (
      <div style={{ margin: 'auto' }}>
        <canvas
          id="hero-stats-chart"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          ref={canvas => { this.canvas = canvas; }}
        >No Canvas</canvas>
      </div>
    );
  },

  shouldComponentUpdate() {
    return false;
  },

  componentDidMount() {
    const chartData = getPieData(this.props.hero);
    drawChart(this.canvas, chartData);
  },

  componentWillReceiveProps(nextProps) {
    const chartData = getPieData(nextProps.hero);
    drawChart(this.canvas, chartData);
  },
});

function getPieData(hero) {
  return [
    { label: 'Comics', count: hero.comics.available },
    { label: 'Stories', count: hero.stories.available },
    { label: 'Events', count: hero.events.available },
    { label: 'Series', count: hero.series.available },
  ];
}

function drawChart(canvas, data) {
  const context = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const translateX = width / 2;
  const translateY = height / 2;
  const radius = Math.min(width, height) / 2;

  resetContext(context, width, height);
  context.translate(translateX, translateY);

  const arcs = drawArcs(context, radius, data);
  drawLabels(context, radius, arcs);
}

function resetContext(context, width, height) {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, width, height);
}

function drawArcs(context, radius, data) {
  const arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70)
    .padAngle(0.03)
    .context(context);

  const pie = d3.pie()
    .value(d => d.count);

  const arcs = pie(data);

  context.globalAlpha = 0.7;

  arcs.forEach(function(d, i) {
    context.beginPath();
    arc(d);
    context.fillStyle = ARC_COLORS[i];
    context.fill();
  });

  return arcs;
}

function drawLabels(context, radius, arcs) {
  const labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40)
    .context(context);

  context.globalAlpha = 1;
  context.font = '13px sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = '#fff';

  arcs.forEach(function(d) {
    const c = labelArc.centroid(d);
    context.fillText(d.data.label, c[0], c[1]);
  });
}
