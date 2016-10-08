import * as React from 'react';
import { Card, CardTitle, CardActions, Button } from 'react-mdl';

export default function(props) {
  return (
    <Card shadow={0} style={{width: '320px', height: '320px'}}>
      <CardTitle expand style={{color: '#fff', background: 'url(http://i.annihil.us/u/prod/marvel/i/mg/b/03/52740e4619f54.jpg) center/cover no-repeat'}}>
        Banshee
      </CardTitle>
      <CardActions border>
        <Button colored>Want More</Button>
      </CardActions>
    </Card>
  );
}
