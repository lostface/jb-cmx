import * as React from 'react';
import * as d3 from 'd3-shape';
import * as R from 'ramda';

const ARC_COLORS = ['#1f77b4', '#ff7f0e', '#9467bd', '#2ca02c'];

export default React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
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

  render() {
    const { width, height } = this.props;

    return (
      <div style={{ margin: 'auto' }}>
        <canvas
          id="hero-stats-chart"
          width={width}
          height={height}
          ref={canvas => { this.canvas = canvas; }}
        >No Canvas</canvas>
      </div>
    );
  },

  shouldComponentUpdate() {
    return false;
  },

  componentDidMount() {
    const canvas = this.canvas;
    const context = canvas.getContext('2d');
    this.cvTranslateX = canvas.width / 2;
    this.cvTranslateY = canvas.height / 2;

    context.translate(this.cvTranslateX, this.cvTranslateY);
  },

  componentWillReceiveProps(nextProps) {
    const canvas = this.canvas;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2;

    context.clearRect(-this.cvTranslateX, -this.cvTranslateY, width, height);

    // TODO draw only if nextProps.hero changed

    const hero = nextProps.hero;
    if (R.isEmpty(hero)) {
      return;
    }

    const data = getPieData(hero);
    const arcs = drawArcs(context, radius, data);
    drawLabels(context, radius, arcs);
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
