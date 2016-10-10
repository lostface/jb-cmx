import * as React from 'react';
import * as R from 'ramda';
import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl';
import { HeroList, HeroDetailDialog, SearchField } from '../components';
import { searchHeroes } from '../services';

export default React.createClass({
  render() {
    const { heroes, showHeroDetailDialog, selectedHero } = this.state;

    return (
      <div>
        <Layout fixedHeader>
          <Header title="Marvel HEROeS">
            <SearchField onSearchTrigger={this.search} />
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
      heroes: [],
      showHeroDetailDialog: false,
      selectedHero: undefined,
    };
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

  handleHeroWantMoreClick(heroId) {
    const hero = this.findHeroById(heroId);
    this.showHeroDetailDialog(hero);
  },
});
