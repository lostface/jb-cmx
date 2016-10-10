import * as React from 'react';
import * as R from 'ramda';
import { Layout, Header, Textfield, Drawer, Navigation, Content } from 'react-mdl';
import { HeroList, HeroDetailDialog } from '../components';
import { searchHeroes } from '../services';

const KEY_CODE_ENTER = 13;
const KEY_CODE_ESCAPE = 27;

export default React.createClass({
  render() {
    const { searchText, heroes, showHeroDetailDialog, selectedHero } = this.state;

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
            <HeroList heroes={heroes} onHeroWantMoreClick={this.handleHeroWantMoreClick} />
          </Content>
        </Layout>
        <HeroDetailDialog
          show={showHeroDetailDialog}
          hero={selectedHero}
          onCloseTrigger={this.closeHeroDetailDialog} />
      </div>
    );
  },

  getInitialState() {
    return {
      searchText: '',
      heroes: [],
      showHeroDetailDialog: false,
      selectedHero: undefined,
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

  findHeroById(id) {
    const findHeroWithId = R.find(R.propEq('id', id));
    return findHeroWithId(this.state.heroes);
  },

  showHeroDetailDialog(hero) {
    this.setState({
      selectedHero: hero,
      showHeroDetailDialog: true,
    });
  },

  closeHeroDetailDialog() {
    this.setState({
      selectedHero: undefined,
      showHeroDetailDialog: false,
    });
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
  },

  handleHeroWantMoreClick(heroId) {
    const hero = this.findHeroById(heroId);
    this.showHeroDetailDialog(hero);
  },
});
