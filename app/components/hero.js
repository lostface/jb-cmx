import * as React from 'react';
import { Card, CardTitle, CardActions, Button } from 'react-mdl';

export default function Hero(props) {
  const { id, name, thumbnail } = props;

  return (
    <Card id={`hero-${id}`} shadow={0} style={{width: '320px', height: '320px'}}>
      <CardTitle expand style={{color: '#fff', background: `url(${thumbnail}) center/cover no-repeat`}}>
        {name}
      </CardTitle>
      <CardActions border>
        <Button colored>Want More</Button>
      </CardActions>
    </Card>
  );
}

Hero.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  thumbnail: React.PropTypes.string.isRequired,
};
