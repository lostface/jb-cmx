import * as React from 'react';
import * as R from 'ramda';
import { Grid, Cell } from 'react-mdl';
import Hero from './hero';

export default function HeroList(props) {
  const { heroes, onHeroWantMoreClick } = props;

  return (
    <div style={{width: '90%', margin: 'auto'}}>
      <Grid>
        {R.map(createHeroNode, heroes)}
      </Grid>
    </div>
  );

  function createHeroNode(hero) {
    return (
      <Cell key={hero.id} col={4} phone={3} tablet={4} align="middle">
        <Hero {...hero} onWantMoreClick={onHeroWantMoreClick} />
      </Cell>
    );
  }
}

HeroList.propTypes = {
  heroes: React.PropTypes.arrayOf(
    // TODO shape is same as in hero can be extracted
    React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      thumbnail: React.PropTypes.string.isRequired,
    })
  ).isRequired,
  onHeroWantMoreClick: React.PropTypes.func,
};

HeroList.defaultProps = {
  heroes: [],
};
