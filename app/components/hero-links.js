import * as React from 'react';
import * as R from 'ramda';
import { Button } from 'react-mdl';

export default function HeroLinks(props) {
  const { heroUrls } = props;

  return (
    <div>
      { R.map(createLinkNode, heroUrls) }
    </div>
  );

  function createLinkNode(url) {
    return (
      <a
          key={url.type}
          href={url.url}
          target="_blank"
          rel="noopener noreferrer" >
        <Button>{url.type}</Button>
      </a>
    );
  }
}

HeroLinks.propTypes = {
  heroUrls: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      type: React.PropTypes.string.isRequired,
      url: React.PropTypes.string.isRequired,
    })
  ),
};

HeroLinks.defaultProps = {
  heroUrls: [],
};
