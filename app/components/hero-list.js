import * as React from 'react';
import { Grid, Cell } from 'react-mdl';
import Hero from './hero';

export default function(props) {
  return (
    <div style={{width: '90%', margin: 'auto'}}>
      <Grid>
        <Cell col={4} phone={3} tablet={4} align="middle">
          <Hero/>
        </Cell>
        <Cell col={4} phone={3} tablet={4} align="middle">
          <Hero/>
        </Cell>
        <Cell col={4} phone={3} tablet={4} align="middle">
          <Hero/>
        </Cell>
        <Cell col={4} phone={3} tablet={4} align="middle">
          <Hero/>
        </Cell>
        <Cell col={4} phone={3} tablet={4} align="middle">
          <Hero/>
        </Cell>
        <Cell col={4} phone={3} tablet={4} align="middle">
          <Hero/>
        </Cell>
      </Grid>
    </div>
  );
}
