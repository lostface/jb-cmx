import * as React from 'react';
import { Layout, Header, Textfield, Drawer, Navigation, Content } from 'react-mdl';
import { HeroList } from '../components';

const KEY_CODE_ESCAPE = 27;

export default React.createClass({
  render() {
    const { searchText } = this.state;
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
            <HeroList />
          </Content>
        </Layout>
      </div>
    );
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

    if (keyCode === KEY_CODE_ESCAPE) {
      this.clearSearchText();
    }
  }
});
