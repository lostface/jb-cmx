import * as React from 'react';
import HeroStatsChart from './hero-stats-chart';
import HeroLinks from './hero-links';
import { Button, Dialog, DialogTitle, DialogActions, DialogContent } from 'react-mdl';

export default function HeroDetailDialog(props) {
  const { show, hero, onCloseTrigger } = props;
  const statsAvailable = hero.comics.available > 0
    || hero.stories.available > 0
    || hero.events.available > 0
    || hero.series.available > 0;

  return (
    <div>
      <Dialog open={show} onCancel={onCloseTrigger} onClick={handleClick} style={{width: '40%'}} >
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
          <HeroLinks hero={hero} />

          <h4>Stats</h4>
          { statsAvailable ? <HeroStatsChart hero={hero} /> : null }
        </DialogContent>

        <DialogActions>
          <Button onClick={onCloseTrigger}>Gotcha</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  function handleClick(event) {
    const targetTagName = event.target.tagName.toLowerCase();
    // when clicked outside
    if (targetTagName == 'dialog') {
      onCloseTrigger();
    }
  }
}

HeroDetailDialog.propTypes = {
  show: React.PropTypes.bool.isRequired,
  hero: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    thumbnail: React.PropTypes.string.isRequired,
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
};
