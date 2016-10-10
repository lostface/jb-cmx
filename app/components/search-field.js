import * as React from 'react';
import { Textfield } from 'react-mdl';

const KEY_CODE_ENTER = 13;
const KEY_CODE_ESCAPE = 27;

export default React.createClass({
  propTypes: {
    onSearchTrigger: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      onSearchTrigger: () => {},
    };
  },

  render() {
    const { searchText } = this.state;

    return (
      <Textfield
        value={searchText}
        onChange={this.handleSearchTextChange}
        onKeyDown={this.handleSearchTextKeyDown}
        label="Search"
        expandable
        expandableIcon="search"
      />
    );
  },

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.searchText !== this.state.searchText;
  },

  getInitialState() {
    return {
      searchText: '',
    };
  },

  clearSearchText() {
    this.setState({ searchText: '' });
  },

  handleSearchTextChange(event) {
    const searchText = event.target.value;
    this.setState({ searchText });
  },

  handleSearchTextKeyDown(event) {
    const { keyCode } = event;
    const { onSearchTrigger } = this.props;

    if (keyCode === KEY_CODE_ESCAPE) {
      this.clearSearchText();
    } else if (keyCode === KEY_CODE_ENTER) {
      onSearchTrigger(this.state.searchText);
    }
  },
});
