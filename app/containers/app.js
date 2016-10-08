import * as React from 'react';
import { Layout, Header, Textfield, Drawer, Navigation, Content } from 'react-mdl';
import { HeroList } from '../components';
import { searchHeroes } from '../services';

const KEY_CODE_ENTER = 13;
const KEY_CODE_ESCAPE = 27;

export default React.createClass({
  render() {
    const { searchText, heroes } = this.state;

    return (
      <div>
        <Layout fixedHeader>
          <Header title="Marvel HEROeS">
            <Textfield
              value={searchText}
              onChange={this.handleSearchTextChange}
              onKeyDown={this.handleSearchTextKeyDown}
              label="Search"
              expandable
              expandableIcon="search"
            />
          </Header>
          <Drawer title="Menu">
            <Navigation>
              <p>About</p>
            </Navigation>
          </Drawer>
          <Content>
            <HeroList heroes={heroes} />
          </Content>
        </Layout>
      </div>
    );
  },

  getInitialState() {
    return {
      searchText: '',
      heroes: [],
    };
  },

  clearSearchText() {
    this.setState({ searchText: '' });
  },

  search(searchText) {
    // TODO empty search not supported yet
    if (searchText === '') { return; }

    // TODO error handling
    searchHeroes(searchText)
      .then(heroes => this.setState({ heroes }));
  },

  handleSearchTextChange(event) {
    const searchText = event.target.value;
    this.setState({ searchText });
  },

  handleSearchTextKeyDown(event) {
    const { keyCode } = event;

    if (keyCode === KEY_CODE_ESCAPE) {
      this.clearSearchText();
    } else if (keyCode === KEY_CODE_ENTER) {
      this.search(this.state.searchText);
    }
  }
});
