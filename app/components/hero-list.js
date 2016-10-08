import * as React from 'react';
import * as R from 'ramda';
import { Grid, Cell } from 'react-mdl';
import Hero from './hero';

export default function(props) {
  const { heroes } = props;

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
        <Hero {...hero} />
      </Cell>
    );
  }
}
