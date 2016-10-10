import * as React from 'react';
import HeroStatsChart from './hero-stats-chart';
import HeroLinks from './hero-links';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from 'react-mdl';

export default React.createClass({
  propTypes: {
    show: React.PropTypes.bool.isRequired,
    hero: React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired,
      thumbnail: React.PropTypes.string.isRequired,
      urls: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          type: React.PropTypes.string.isRequired,
          url: React.PropTypes.string.isRequired,
        })
      ),
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
    }),
    onCloseTrigger: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      show: false,
      hero: {
        id: -1,
        name: '',
        description: '',
        thumbnail: '',
        urls: [],
        comics: { available: 0 },
        stories: { available: 0 },
        events: { available: 0 },
        series: { available: 0 },
      },
    };
  },

  render() {
    const { show, hero, onCloseTrigger } = this.props;
    const statsAvailable = hero.comics.available > 0
      || hero.stories.available > 0
      || hero.events.available > 0
      || hero.series.available > 0;

    return (
      <div id="hero-detail-dialog-container">
        <Dialog open={show} onCancel={onCloseTrigger} onClick={this.handleClick} style={{width: '40%'}} >
          <DialogTitle
              style={{
                marginTop: -11,
                padding: '29px 24px 25px 74px',
                background: `url(${hero.thumbnail}) left/64px no-repeat`
              }}>
            {hero.name}
          </DialogTitle>

          <DialogContent>
            <p>{hero.description}</p>

            <h4>Links</h4>
            <HeroLinks heroUrls={hero.urls} />

            <h4>Stats</h4>
            { statsAvailable ? <HeroStatsChart hero={hero} /> : null }
          </DialogContent>

          <DialogActions>
            <Button onClick={onCloseTrigger}>Gotcha</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  },

  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show;
  },

  componentDidMount() {
    const dialog = document.querySelector('#hero-detail-dialog-container > dialog');
    dialogPolyfill.registerDialog(dialog);
  },

  handleClick(event) {
    const targetTagName = event.target.tagName.toLowerCase();
    const { onCloseTrigger } = this.props;

    // when clicked outside
    if (targetTagName == 'dialog') {
      onCloseTrigger();
    }
  },
});
